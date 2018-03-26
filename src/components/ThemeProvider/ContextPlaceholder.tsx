
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as tuuid from 'uuid/v4'

const uuid = (tuuid as any).default || tuuid as typeof tuuid

export interface ProviderProps<T> {
  value: T
}
export interface ConsumerProps<T> {
  children: (value: T) => React.ReactNode
}

export type Provider<T> = React.ComponentType<ProviderProps<T>>
export type Consumer<T> = React.ComponentType<ConsumerProps<T>>

export interface Context<T> {
  Provider: Provider<T>
  Consumer: Consumer<T>
}

export default function createContext<T> (defaultValue: T): Context<T> {
  const id = uuid()

  class ContextProvider extends React.Component<ProviderProps<T>> {
    static childContextTypes = {
      [id]: PropTypes.object,
    }

    getChildContext () {
      return {
        [id]: this.props.value,
      }
    }

    render () {
      return this.props.children
    }
  }

  class ContextConsumer extends React.Component<ConsumerProps<T>> {
    static contextTypes = {
      [id]: PropTypes.object,
    }

    render () {
      return this.props.children(this.context[id] || defaultValue)
    }
  }

  return {
    Provider: ContextProvider,
    Consumer: ContextConsumer,
  }
}
