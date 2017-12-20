
import * as React from 'react'

import Arc from './Arc'

const DEFAULT_EASING = (time: number, start: number, end: number) => {
  return start + ((Math.sin(time * Math.PI) + 1) / 2 * (end - start))
}

export interface Props {
  className?: string
  style?: React.CSSProperties
}

export interface State {
  startAngle: number
  animationCycle: number
}

const SPIN_RATE = 1 / 70
const CYCLE_RATE = 1 / 127
export default class Spinner extends React.Component<Props, State> {
  state: State = {
    startAngle: 0,
    animationCycle: 0,
  }

  private animationFrame: any

  componentDidMount () {
    this.stepAnimation()
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.animationFrame)
  }

  stepAnimation = () => {
    this.animationFrame = requestAnimationFrame(this.stepAnimation)
    this.setState(prev => {
      const { startAngle, animationCycle } = prev

      return {
        startAngle: (startAngle + Math.PI * 2 * SPIN_RATE) % (Math.PI * 2),
        animationCycle: (animationCycle + CYCLE_RATE) % 1,
      }
    })
  }

  getWidth () {
    const MIN = Math.PI / 8
    const MAX = Math.PI * 2 - Math.PI / 3
    const { startAngle, animationCycle } = this.state
    return DEFAULT_EASING(animationCycle * 2, MIN, MAX)
  }

  render () {
    const { className, style } = this.props
    const { startAngle } = this.state

    const width = this.getWidth()
    const realStart = (startAngle - width + Math.PI * 2) % (Math.PI * 2)
    const endAngle = (startAngle + width + Math.PI * 2) % (Math.PI * 2)

    return (
      <svg className={className} style={style} viewBox='0 0 100 100'>
        <Arc
          x={50}
          y={50}
          radius={45}
          startAngle={startAngle}
          endAngle={endAngle}
          color='none'
          stroke='currentColor'
          strokeWidth={10}
        />
      </svg>
    )
  }
}
