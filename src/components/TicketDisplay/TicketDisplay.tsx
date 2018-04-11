
import * as React from 'react'

import Ticket from '../Ticket'

import { ticketDisplay } from './TicketDisplay.scss'

export interface MediaSource {
  url?: string
}

export interface Article {
  id: number
  title: string
  pubDate: string
  image?: MediaSource
}

export interface Props {
  articles: Article[]
  onTicketClick: (id: number) => void
  dateFormat?: (date: string) => string
  className?: string
  style?: React.CSSProperties
}

class TicketDisplay extends React.Component<Props> {
  render () {
    const { articles, onTicketClick, dateFormat = (a) => a, className = '', style } = this.props

    return (
      <div className={`${ticketDisplay} ${className}`} style={style}>
        {
          articles.map(({ id, title, pubDate, image: { url } = { url: undefined } }) => (
            <Ticket
              key={id}
              title={title}
              minorText={dateFormat(pubDate)}
              imageUrl={url}
              onPress={() => onTicketClick(id)}
            />
          ))
        }
      </div>
    )
  }
}

export default TicketDisplay
