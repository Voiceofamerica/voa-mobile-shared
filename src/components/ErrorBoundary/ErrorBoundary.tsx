import * as React from 'react'

import { errorBoundary, content, retryButton } from './ErrorBoundary.scss'

export interface Props {
  error: string | JSX.Element
  retry: string | JSX.Element
  debug?: boolean
}

export interface State {
  hasError: boolean
}

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  state: State = {
    hasError: false,
  }

  componentDidCatch (error) {
    // Display fallback UI
    this.setState({ hasError: true })
    if (this.props.debug) {
      console.error(error)
    }
  }

  onRetry = () => this.setState({ hasError: false })

  render () {
    const { children } = this.props

    if (this.state.hasError) {
      return (
        <div className={errorBoundary}>
          <div className={content}>
            {this.props.error}
          </div>
          <div className={retryButton} onClick={this.onRetry}>
            {this.props.retry}
          </div>
        </div>
      )
    }

    return children as any
  }
}
