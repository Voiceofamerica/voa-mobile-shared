
import * as React from 'react'

import { sleep } from '../../helpers/timingHelper'
import { toRGBAstring } from '../../helpers/colorHelper'

import { themed, ThemeProps, DEFAULT_THEME } from '../ThemeProvider'
import ResilientImage from '../ResilientImage'
import Spinner from '../Spinner'
import SvgIcon from '../SvgIcon'

import { card, overText, imageContainer, gradient, titleText, underText, minorTextArea, iconButton, spinner } from './LargeCard.scss'

export interface IconDefinition {
  icon: string | JSX.Element
  onPress: () => Promise<void> | void
  getClassName?: () => string
  getStyle?: () => React.CSSProperties
}

export interface Props extends ThemeProps {
  title: string
  minorText?: string
  onPress?: () => void
  imageUrl?: string | null
  titleIcon?: JSX.Element | string
  className?: string
  style?: React.CSSProperties
  iconButtons?: IconDefinition[]
}

export type LoadingState = 'done' | 'loading' | 'error'
const DONE: LoadingState = 'done'
const LOADING: LoadingState = 'loading'
const ERROR: LoadingState = 'error'

export interface State {
  iconButtonsLoading: LoadingState[]
}

const IMAGE_RATIO = 9 / 16

export const getHeight = (renderWidth = window.innerWidth, imageRatio = IMAGE_RATIO) => {
  return renderWidth * imageRatio
}

// 40px under height + 7px margin-bottom
export const CARD_PADDING = 47

@themed
class LargeCard extends React.Component<Props, State> {
  state: State = {
    iconButtonsLoading: [],
  }

  private mounted: boolean

  componentDidMount () {
    this.mounted = true
  }

  componentWillUnmount () {
    this.mounted = false
  }

  render () {
    const { className, style } = this.props

    return (
      <div
        className={`${card} ${className}`}
        style={style}
      >
        {this.renderOver()}
        {this.renderUnder()}
      </div>
    )
  }

  private renderOver = () => {
    const { title, onPress, imageUrl, titleIcon, theme = DEFAULT_THEME } = this.props

    const hydratedIcon = titleIcon && this.mapIcon(titleIcon)

    const {
      cardGradientColor,
      cardTitleColor,
    } = theme

    const gradientEnd = toRGBAstring(cardGradientColor, 0.9)
    const gradientBackground = `linear-gradient(transparent, ${gradientEnd})`

    return (
      <div className={overText} onClick={onPress}>
        <ResilientImage className={imageContainer} src={imageUrl} alwaysShow showSpinner />
        <div className={gradient} style={{ background: gradientBackground}}>
          <div className={titleText} style={{ color: cardTitleColor }}>
            <span>{hydratedIcon} {title}</span>
          </div>
        </div>
      </div>
    )
  }

  private renderUnder = () => {
    const { minorText, iconButtons = [], theme = DEFAULT_THEME } = this.props
    const {
      largeCardUnderBackground: background,
      largeCardUnderColor: color,
      largeCardIconColor,
    } = theme

    return (
      <div className={underText} style={{ background, color }}>
        <div className={minorTextArea}>{minorText}</div>
        {
          iconButtons.map(({ icon, onPress, getClassName = () => '', getStyle = () => ({}) }, idx) => {
            return (
              <div key={idx} className={`${iconButton} ${getClassName()}`} onClick={this.clickHandler(idx, onPress)} style={{ color: largeCardIconColor, ...getStyle() }}>
                {this.mapIconButton(idx, icon)}
              </div>
            )
          })
        }
      </div>
    )
  }

  private mapIcon = (icon: string | JSX.Element): JSX.Element => {
    return typeof icon === 'string'
    ? <SvgIcon src={icon} />
    : icon
  }

  private mapIconButton = (idx: number, icon: string | JSX.Element): JSX.Element => {
    const { theme = DEFAULT_THEME } = this.props
    if (this.getIconButtonState(idx) === LOADING) {
      return <Spinner className={spinner} />
    } else if (this.getIconButtonState(idx) === ERROR) {
      return <SvgIcon src='close' style={{ color: theme.largeCardErrorIconColor }} />
    }

    return this.mapIcon(icon)
  }

  private clickHandler = (idx: number, originalHandler: () => Promise<void> | void) => async (): Promise<void> => {
    if (this.getIconButtonState(idx) !== DONE) {
      return
    }

    try {
      const result = originalHandler()
      await this.setIconButtonLoading(idx, LOADING)
      await result
    } catch (err) {
      await this.setIconButtonLoading(idx, ERROR)
      await sleep(1000)
    }
    await this.setIconButtonLoading(idx, DONE)
  }

  private setIconButtonLoading = (idx: number, value: LoadingState) => {
    if (!this.mounted) {
      return Promise.resolve()
    }
    return new Promise(resolve => {
      this.setState(prev => {
        const newList = prev.iconButtonsLoading.slice()
        newList[idx] = value
        return {
          ...prev,
          iconButtonsLoading: newList,
        }
      }, resolve)
    })
  }

  private getIconButtonState = (idx: number): LoadingState => {
    return this.state.iconButtonsLoading[idx] || DONE
  }
}

export default LargeCard
