
import * as React from 'react'
import { FullTheme } from './themeTypes'
import ThemeContext from './ThemeContext'

export const RESERVED_FIELDS = [
  'constructor',
  'render',
  'componentWillMount',
  'componentDidMount',
  'componentWillUnmount',
  'componentDidUpdate',
  'componentDidCatch',
  'componentWillUpdate',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'getSnapshotBeforeUpdate',
]

export interface ThemeProps {
  theme?: FullTheme
}

function unique<T> (array: T[]) {
  return array.filter((value, index, self) => (
    self.indexOf(value) === index
  ))
}

export function themed<B extends React.ComponentClass<P>, P extends ThemeProps> (BaseComponent: B): B {
  let existingKeys = RESERVED_FIELDS
  class ThemedComponent extends React.Component<P> {
    render () {
      return (
        <ThemeContext.Consumer>
          {
            (theme) => (
              <BaseComponent ref={this.setBase} theme={theme} {...this.props} />
            )
          }
        </ThemeContext.Consumer>
      )
    }

    private setBase = (base: any) => {
      if (!base) {
        return
      }

      const newKeys = unique(Object.keys(BaseComponent.prototype).concat(Object.keys(base)))
      newKeys
        .filter(key => !existingKeys.some(k => k === key))
        .filter(key => typeof base[key] === 'function' || (!base[key] && typeof BaseComponent.prototype[key] === 'function'))
        .forEach(key => {
          const func = (base[key] || BaseComponent.prototype[key]) as Function
          Object.defineProperty(this, key, {
            value: func.bind(base),
            writable: false,
          })
        })
    }
  }

  existingKeys = unique(
    RESERVED_FIELDS
      .concat(Object.keys(ThemedComponent.prototype))
      .concat(Object.keys(new ThemedComponent({} as any))),
  )

  Object.defineProperty(ThemedComponent, 'name', {
    value: BaseComponent.name,
    writable: false,
  })

  return ThemedComponent as any as B
}
