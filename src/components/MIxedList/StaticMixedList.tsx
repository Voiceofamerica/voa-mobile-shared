
import * as React from 'react'

import { TextDirection, directionObservable } from '../../helpers/text'
import Card from '../Card'
import SecondaryCard from '../SecondaryCard'
import Ticket from '../Ticket'

import { BaseProps } from './MixedListTypes'
import { mixedList, row, ticketRow, fixed } from './MixedList.scss'

export interface Props extends BaseProps {
}

class StaticMixedList extends React.PureComponent<Props> {
  render () {
    const { items = [], className = '', style } = this.props

    return (
      <div className={`${mixedList} ${className}`} style={style}>
        {
          items.length > 0
          ? this.renderContent()
          : ''
        }
      </div>
    )
  }

  private renderContent = () => {
    const { items } = this.props

    const count = items.length <= 2 ? items.length : items.length - 1

    return (
      Array.apply(null, Array(count))
        .map((item, index) => this.renderRow(index))
    )
  }

  private renderRow = (index: number) => {
    if (index === 0) {
      return this.renderCardRow()
    } else if (index === 1) {
      return this.renderSecondaryCardRow()
    } else {
      return this.renderTicketRow(index)
    }
  }

  private renderCardRow = () => {
    const { items, onItemClick } = this.props

    const { id, image, title, icon } = items[0]

    return (
      <div key={id} className={`${fixed} ${row}`}>
        <Card
          onPress={() => onItemClick(id)}
          title={title}
          imageUrl={image && image.hero}
          icon={icon}
        />
      </div>
    )
  }

  private renderSecondaryCardRow = () => {
    return (
      <div key={2} className={row}>
        {this.renderSecondaryCard(1)}
        {this.renderSecondaryCard(2)}
      </div>
    )
  }

  private renderSecondaryCard = (index: number) => {
    const { items, onItemClick } = this.props

    const item = items[index]

    if (!item) {
      return <div style={{ flex: 1 }} />
    }

    const { id, image, title, icon } = item

    return (
      <SecondaryCard
        onPress={() => onItemClick(id)}
        title={title}
        imageUrl={image && image.thumb}
        icon={icon}
      />
    )
  }

  private renderTicketRow = (row: number) => {
    const { items, onItemClick } = this.props

    const { id, image, title, minorText, icon } = items[row + 1]

    return (
      <div key={id} className={ticketRow}>
        <Ticket
          onPress={() => onItemClick(id)}
          title={title}
          imageUrl={image && image.tiny}
          minorText={minorText}
          icon={icon}
        />
      </div>
    )
  }
}

export default StaticMixedList
