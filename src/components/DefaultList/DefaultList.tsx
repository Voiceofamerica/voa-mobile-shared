
import * as React from 'react'
import { List, ListRowProps, Index } from 'react-virtualized'
import { Subscription } from 'rxjs/Subscription'

import { resizeObservable } from '../../helpers/window'
import { TextDirection, directionObservable } from '../../helpers/text'
import Card, { getHeight as getCardHeight } from '../Card'
import SecondaryCard, { getHeight as getSecondaryCardHeight } from '../SecondaryCard'
import Ticket, { TICKET_HEIGHT } from '../Ticket'

import StaticDefaultList from './StaticDefaultList'
import { BaseProps } from './DefaultListTypes'
import { defaultList, row, ticketRow } from './DefaultList.scss'

export interface Props extends BaseProps {
  emptyContent?: string | JSX.Element
  height?: number
  width?: number
  dir?: TextDirection
}

export interface State {
  renderHeight: number
  renderWidth: number
  cardHeight: number
  secondaryCardHeight: number
  dir: TextDirection
}

const MENU_HEIGHT = 150
const BORDER_SIZE = 1
// 4px border-bottom + 7px margin-bottom
const CARD_MARGIN = 11

class DefaultList extends React.PureComponent<Props, State> {
  static Static = StaticDefaultList

  state: State = {
    renderHeight: window.innerHeight - MENU_HEIGHT,
    renderWidth: this.props.height || window.innerWidth,
    cardHeight: getCardHeight(),
    secondaryCardHeight: getSecondaryCardHeight(),
    dir: this.props.dir || directionObservable.getValue(),
  }

  private container: HTMLDivElement | null = null
  private virtualList: List | null = null
  private resizeSub: Subscription
  private directionSub: Subscription

  componentDidMount () {
    this.resizeSub = resizeObservable.subscribe(() => {
      const renderHeight = this.getNewHeight(this.props)
      const renderWidth = this.getNewWidth(this.props)
      const cardHeight = getCardHeight(renderWidth)
      const secondaryCardHeight = getSecondaryCardHeight(renderWidth)
      this.setState({ renderHeight, renderWidth, cardHeight, secondaryCardHeight }, () => {
        if (this.virtualList) {
          this.virtualList.recomputeRowHeights()
        }
      })
    })
    this.directionSub = directionObservable.subscribe(dir => {
      if (this.props.dir) {
        return
      }

      this.setState({ dir })
    })
  }

  componentWillUnmount () {
    this.resizeSub.unsubscribe()
    this.directionSub.unsubscribe()
  }

  componentWillReceiveProps (nextProps: Props) {
    const renderHeight = this.getNewHeight(nextProps)
    const renderWidth = this.getNewWidth(nextProps)
    const cardHeight = getCardHeight(renderWidth)
    const secondaryCardHeight = getSecondaryCardHeight(renderWidth)
    const dir = nextProps.dir || directionObservable.getValue()
    this.setState({ renderHeight, renderWidth, cardHeight, secondaryCardHeight, dir })
  }

  render () {
    const { items = [], emptyContent = '', className = '', style } = this.props

    return (
      <div ref={this.setContainer} className={`${defaultList} ${className}`} style={style}>
        {
          items.length > 0
          ? this.renderVirtualContent()
          : emptyContent
        }
      </div>
    )
  }

  private getNewHeight = ({ height = 0 }: Props) => {
    if (height > 0) {
      return height
    } else if (this.container) {
      return this.container.clientHeight
    } else {
      return window.innerHeight - MENU_HEIGHT
    }
  }

  private getNewWidth = ({ width = 0 }: Props) => {
    if (width > 0) {
      return width
    } else if (this.container) {
      return this.container.clientWidth
    } else {
      return window.innerWidth
    }
  }

  private renderVirtualContent = () => {
    const { items = [] } = this.props
    const { renderHeight, renderWidth } = this.state

    const count = items.length <= 2 ? items.length : items.length - 1

    return (
      <List
        ref={this.setVirtualList}
        height={renderHeight}
        rowHeight={this.getHeight}
        rowCount={count}
        width={renderWidth}
        rowRenderer={this.renderRow}
      />
    )
  }

  private getHeight = ({ index }: Index) => {
    if (index === 0) {
      return this.state.cardHeight + CARD_MARGIN
    } else if (index === 1) {
      return this.state.secondaryCardHeight
    } else {
      return TICKET_HEIGHT + BORDER_SIZE
    }
  }

  private renderRow = (rowProps: ListRowProps) => {
    if (rowProps.index === 0) {
      return this.renderCardRow(rowProps)
    } else if (rowProps.index === 1) {
      return this.renderSecondaryCardRow(rowProps)
    } else {
      return this.renderTicketRow(rowProps)
    }
  }

  private renderCardRow = ({ index, key, style }: ListRowProps) => {
    const { dir } = this.state
    const { items, onItemClick } = this.props

    const { id, image, title, icon } = items![0]

    return (
      <div key={key} className={row} style={style} dir={dir}>
        <Card
          onPress={() => onItemClick(id)}
          title={title}
          imageUrl={image && image.hero}
          icon={icon}
        />
      </div>
    )
  }

  private renderSecondaryCardRow = ({ key, style }: ListRowProps) => {
    const { dir } = this.state

    return (
      <div key={key} className={row} style={style} dir={dir}>
        {this.renderSecondaryCard(1)}
        {this.renderSecondaryCard(2)}
      </div>
    )
  }

  private renderSecondaryCard = (index: number) => {
    const { items, onItemClick } = this.props

    const item = items![index]

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

  private renderTicketRow = ({ index, isScrolling, key, style }: ListRowProps) => {
    const { dir } = this.state
    const { items, onItemClick } = this.props

    const { id, image, title, minorText, icon } = items![index + 1]

    return (
      <div key={key} className={ticketRow} style={style} dir={dir}>
        <Ticket
          onPress={() => onItemClick(id)}
          title={title}
          imageUrl={image && image.tiny}
          minorText={minorText}
          icon={icon}
          suppressImage={isScrolling}
        />
      </div>
    )
  }

  private setContainer = (el: HTMLDivElement | null) => {
    this.container = el
    const renderHeight = this.getNewHeight(this.props)
    const renderWidth = this.getNewWidth(this.props)
    const cardHeight = getCardHeight(renderWidth)
    const secondaryCardHeight = getSecondaryCardHeight(renderWidth)
    this.setState({ renderHeight, renderWidth, cardHeight, secondaryCardHeight })
  }

  private setVirtualList = (el: List | null) => {
    this.virtualList = el
  }
}

export default DefaultList
