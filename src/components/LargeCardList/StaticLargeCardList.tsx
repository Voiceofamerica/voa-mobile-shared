
import * as React from 'react'

import LargeCard, { IconDefinition } from '../LargeCard'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'
import { BaseProps } from './LargeCardListTypes'
import { cardList, row, fixed } from './LargeCardList.scss'

export interface Props extends BaseProps, ThemeProps {
}

@themed
class StaticCardList extends React.Component<Props> {
  render () {
    const { items = [], theme = DEFAULT_THEME } = this.props
    const {
      largeCardListBackground,
    } = theme

    return (
      <div className={cardList} style={{ background: largeCardListBackground }}>
        {
          items.length > 0
          ? this.renderContent()
          : ''
        }
      </div>
    )
  }

  private renderContent = () => {
    const { items = [], onItemClick } = this.props

    return items.map(({ id, image, title, icon }) => (
      <div key={id} className={`${fixed} ${row}`}>
        <LargeCard
          onPress={() => onItemClick(id)}
          title={title}
          imageUrl={image && image.hero}
          titleIcon={icon}
          iconButtons={this.makeIconButtons(id)}
        />
      </div>
    ))
  }

  private makeIconButtons = (id: number): IconDefinition[] => {
    const { iconButtons = [] } = this.props
    return iconButtons.map(({ icon, onPress, getClass, getStyle }) => ({
      icon,
      getClassName: getClass ? () => getClass(id) : undefined,
      getStyle: getStyle ? () => getStyle(id) : undefined,
      onPress: () => onPress(id),
    }))
  }
}

export default StaticCardList
