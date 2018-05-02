
import * as React from 'react'

import { toRGBAstring } from '../../helpers/colorHelper'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'

import StaticItem from './StaticItem'
import TopNavItem, { Props as TopNavItemProps } from './TopNavItem'
import CenterText from './CenterText'
import {
  topNav,
  flexFlow,
  innerContainer,
  itemContainer,
  fadeout,
  topNavItem,
} from './TopNav.scss'

export interface Props extends React.Props<any>, ThemeProps {
  flex?: boolean
  rtl?: boolean
  className?: string
  style?: React.CSSProperties
}

@themed
class TopNav extends React.Component<Props> {
  render () {
    const { children, flex, rtl, className = '', style, theme = DEFAULT_THEME } = this.props
    const {
      topNavBackground,
      topNavColor,
      topNavStaticColor,
      topNavSelectedBackground,
      topNavSelectedColor,
    } = theme

    const rChildren = React.Children.toArray(children) as React.ReactElement<any>[]
    const items = rChildren.filter(({ type }) => type === TopNavItem || type === CenterText)
      .map(child => {
        if (child.type === CenterText) {
          return child
        } else {
          const props = child.props as TopNavItemProps
          const { key } = child
          if (!props.selected) {
            return child
          } else {
            return <TopNavItem {...props} key={key || undefined} style={{ ...props.style, color: topNavSelectedColor, background: topNavSelectedBackground }} />
          }
        }
      })

    const originalStatics = rChildren.filter(child => child.type === StaticItem)
    const statics = originalStatics.map(({ key, props }) => (
      <StaticItem key={key} {...props} style={{ ...props.style, color: topNavStaticColor }} />
    ))

    const rgbStart = toRGBAstring(topNavBackground, 0)
    const rgbEnd = toRGBAstring(topNavBackground, 0.9)
    const fadeoutBackground = rtl
                            ? `linear-gradient(-90deg, ${rgbStart}, ${rgbEnd} 90%)`
                            : `linear-gradient(90deg, ${rgbStart}, ${rgbEnd} 90%)`

    let startStatic: any = null
    let endStatic: any = null

    if (statics.length > 1) {
      startStatic = statics[0]
      endStatic = statics[1]
    } else if (statics[0]) {
      if (rChildren.indexOf(originalStatics[0]) === (rChildren.length - 1)) {
        endStatic = statics[0]
      } else {
        startStatic = statics[0]
      }
    }

    const fullClassName = flex
                        ? `${topNav} ${flexFlow} ${className}`
                        : `${topNav} ${className}`

    return (
      <div className={fullClassName} style={{ ...style, background: topNavBackground, color: topNavColor }}>
        {startStatic}
        <div className={itemContainer}>
          <div className={innerContainer}>
            {items}
            <div className={topNavItem}>&nbsp;</div>
          </div>
          <div className={fadeout} style={{ backgroundImage: fadeoutBackground }} />
        </div>
        {endStatic}
      </div>
    )
  }
}

export default TopNav
