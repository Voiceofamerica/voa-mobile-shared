
import * as React from 'react'
import { List, ListRowProps } from 'react-virtualized'
import { Subscription } from 'rxjs/Subscription'

import { resizeObservable } from '../../helpers/windowHelper'
import { TextDirection, directionObservable } from '../../helpers/textDirectionHelper'
import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'
import LargeCard, { IconDefinition, getHeight, CARD_PADDING } from '../LargeCard'

import { BaseProps } from './LargeCardListTypes'
import { cardList, row } from './LargeCardList.scss'

export interface Props extends BaseProps, ThemeProps {
  emptyContent?: string | JSX.Element
  height?: number
  width?: number
  dir?: TextDirection
}

export interface State {
  renderHeight: number
  renderWidth: number
  cardHeight: number
  dir: TextDirection
}

const MENU_HEIGHT = 150

@themed
class LargeCardList extends React.PureComponent<Props, State> {
  state: State = {
    renderHeight: this.props.height || window.innerHeight - MENU_HEIGHT,
    renderWidth: this.props.width || window.innerWidth,
    cardHeight: getHeight(),
    dir: this.props.dir || directionObservable.getValue(),
  }

  private container: HTMLDivElement | null = null
  private resizeSub: Subscription
  private directionSub: Subscription

  componentDidMount () {
    this.resizeSub = resizeObservable.subscribe(() => {
      const renderHeight = this.getNewHeight(this.props)
      const renderWidth = this.getNewWidth(this.props)
      const cardHeight = getHeight(renderWidth)
      this.setState({ renderHeight, renderWidth, cardHeight })
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
    const cardHeight = getHeight(renderWidth)
    const dir = nextProps.dir || directionObservable.getValue()
    this.setState({ renderHeight, renderWidth, cardHeight, dir })
  }

  render () {
    const { items = [], emptyContent = '', theme = DEFAULT_THEME } = this.props
    const {
      largeCardListBackground,
    } = theme

    return (
      <div ref={this.setContainer} className={cardList} style={{ background: largeCardListBackground }}>
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
    const { renderHeight, renderWidth, cardHeight } = this.state

    return (
      <List
        height={renderHeight}
        rowHeight={cardHeight + CARD_PADDING}
        rowCount={items.length}
        width={renderWidth}
        rowRenderer={this.renderRow}
      />
    )
  }

  private renderRow = ({ index, isScrolling, key, style }: ListRowProps) => {
    const { dir } = this.state
    const { items, onItemClick, iconButtons = [] } = this.props

    const { id, image, title, icon, minorText } = items![index]

    const localIconButtons = iconButtons.map(({ icon, onPress, getClass, getStyle }): IconDefinition => ({
      icon,
      getClassName: getClass ? () => getClass(id) : undefined,
      getStyle: getStyle ? () => getStyle(id) : undefined,
      onPress: () => onPress(id),
    }))

    return (
      <div key={key} className={row} style={style} dir={dir}>
        <LargeCard
          onPress={() => onItemClick(id)}
          title={title}
          minorText={minorText}
          imageUrl={image && image.hero}
          titleIcon={icon}
          iconButtons={localIconButtons}
        />
      </div>
    )
  }

  private setContainer = (el: HTMLDivElement | null) => {
    this.container = el
    const renderHeight = this.getNewHeight(this.props)
    const renderWidth = this.getNewWidth(this.props)
    const cardHeight = getHeight(renderWidth)
    this.setState({ renderHeight, renderWidth, cardHeight })
  }
}

export default LargeCardList
