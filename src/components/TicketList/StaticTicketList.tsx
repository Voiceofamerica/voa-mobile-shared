
import * as React from 'react'

import Ticket from '../Ticket'

import { BaseProps } from './TicketListTypes'
import { ticketList, row } from './TicketList.scss'

export interface Props extends BaseProps {
}

class StaticTicketList extends React.Component<Props> {
  render () {
    const { items = [] } = this.props

    return (
      <div className={ticketList}>
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

    return items.map(({ id, image, title, minorText, icon }) => (
      <div key={id} className={row}>
        <Ticket
          onPress={() => onItemClick(id)}
          title={title}
          imageUrl={image && image.tiny}
          minorText={minorText}
          icon={icon}
        />
      </div>
    ))
  }
}

export default StaticTicketList
