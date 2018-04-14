
import * as React from 'react'

import Card from '../Card'

import { BaseProps } from './CardListTypes'
import { cardList, row, fixed } from './CardList.scss'

export interface Props extends BaseProps {
}

class StaticCardList extends React.Component<Props> {
  render () {
    const { items = [] } = this.props

    return (
      <div className={cardList}>
        {
          items.length > 0
          ? this.renderContent()
          : ''
        }
      </div>
    )
  }

  private renderContent = () => {
    const { items, onItemClick } = this.props

    return items.map(({ id, image, title, minorText }) => (
      <div key={id} className={`${fixed} ${row}`}>
        <Card
          onPress={() => onItemClick(id)}
          title={title}
          imageUrl={image && image.hero}
        />
      </div>
    ))
  }
}

export default StaticCardList
