
import * as React from 'react'

import { toRGBAstring } from '../../helpers/colorHelper'

import { ThemeConsumer } from '../ThemeProvider'

import StaticItem from './StaticItem'
import TopNavItem, { Props as TopNavItemProps } from './TopNavItem'
import CenterText from './CenterText'
import { topNav, innerContainer, itemContainer, fadeout } from './TopNav.scss'

export interface Props extends React.Props<any> {
  rtl?: boolean
  style?: React.CSSProperties
}

function TopNav ({ children, rtl, style }: Props) {
  return (
    <ThemeConsumer>
      {
        (theme) => {
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
          const preStatics = rChildren.filter(child => child.type === StaticItem)
          const statics = preStatics.map(({ key, props }) => (
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
            console.log('index', rChildren.indexOf(preStatics[0]))
            if (rChildren.indexOf(preStatics[0]) === (rChildren.length - 1)) {
              endStatic = statics[0]
            } else {
              startStatic = statics[0]
            }
          }

          return (
            <div className={topNav} style={{ ...style, background: topNavBackground, color: topNavColor }}>
              {startStatic}
              <div className={itemContainer}>
                <div className={innerContainer}>
                  {items}
                  <div>&nbsp;</div>
                </div>
                <div className={fadeout} style={{ backgroundImage: fadeoutBackground }} />
              </div>
              {endStatic}
            </div>
          )
        }
      }
    </ThemeConsumer>
  )
}

export default TopNav
