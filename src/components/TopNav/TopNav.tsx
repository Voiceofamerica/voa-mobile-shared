
import * as React from 'react'

import { ThemeConsumer } from '../ThemeProvider'

import StaticItem from './StaticItem'
import TopNavItem, { Props as TopNavItemProps } from './TopNavItem'
import CenterText from './CenterText'
import { topNav, innerContainer, itemContainer, fadeout } from './TopNav.scss'

export interface Props extends React.Props<any> {
  rtl?: boolean
  style?: React.CSSProperties
}

function toRGB (color: string) {
  const r = parseInt(color.substring(1, 3), 16)
  const g = parseInt(color.substring(3, 5), 16)
  const b = parseInt(color.substring(5, 7), 16)

  return `${r}, ${g}, ${b}`
}

function TopNav ({ children, rtl, style }: Props) {
  return (
    <ThemeConsumer>
      {
        (theme) => {
          const {
            mainBackground,
            mainColor,
            staticColor,
            selectedBackground,
            selectedColor,
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
                                       return <TopNavItem key={key} {...props} style={{ ...props.style, color: selectedColor, background: selectedBackground }} />
                                     }
                                   }
                                 })
          const statics = rChildren.filter(child => child.type === StaticItem)
                                   .map(({ key, props }) => (
                                     <StaticItem key={key} {...props} style={{ ...props.style, color: staticColor }} />
                                   ))

          const rgb = toRGB(mainBackground)
          const fadeoutBackground = rtl
                                  ? `linear-gradient(-90deg, rgba(${rgb}, 0), rgba(${rgb}, 0.9) 90%)`
                                  : `linear-gradient(90deg, rgba(${rgb}, 0), rgba(${rgb}, 0.9) 90%)`
          return (
            <div className={topNav} style={{ ...style, background: mainBackground, color: mainColor }}>
              {statics[0]}
              <div className={itemContainer}>
                <div className={innerContainer}>
                  {items}
                </div>
                <div className={fadeout} style={{ backgroundImage: fadeoutBackground }} />
              </div>
              {statics[1]}
            </div>
          )
        }
      }
    </ThemeConsumer>
  )
}

export default TopNav
