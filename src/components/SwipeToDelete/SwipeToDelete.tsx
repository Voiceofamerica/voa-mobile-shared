
import * as React from 'react'
import * as ReactSwipeable from 'react-swipeable'

import { fixDefault } from '../../helpers/importHelper'
const Swipeable = fixDefault<typeof ReactSwipeable>(ReactSwipeable)

import { swipeToDelete, animated } from './SwipeToDelete.scss'

export interface Props {
  onSwipe: () => void
}

export interface State {
  offset: number
  touching: boolean
}

const SWIPE_DISTANCE = 100
class SwipeToDelete extends React.Component<Props, State> {
  state: State = {
    offset: 0,
    touching: false,
  }

  setTouch = (offset: number, touching: boolean) =>
    this.setState({ offset, touching })

  swiping = (e, deltaX: number) => {
    this.setTouch(deltaX, true)
  }

  swiped = (e, deltaX, deltaY, isFlick) => {
    const { onSwipe = () => null } = this.props
    const isSwipe = Math.abs(deltaX) > SWIPE_DISTANCE

    this.setTouch(0, false)
    if (isFlick || isSwipe) {
      onSwipe()
    }
  }

  render () {
    const { children } = this.props
    const { offset, touching } = this.state
    const fullClassName = touching ? swipeToDelete : `${swipeToDelete} ${animated}`

    const right = touching ? offset : 0
    const opacity = touching ? 1 - Math.abs(offset) / 200 : 1

    return (
      <Swipeable onSwiping={this.swiping} onSwiped={this.swiped} className={fullClassName} style={{ right, opacity }}>
        {children}
      </Swipeable>
    )
  }
}

export default SwipeToDelete
