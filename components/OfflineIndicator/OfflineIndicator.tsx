
import * as React from 'react'
import { Subscription } from 'rxjs/Subscription'

import { onlineStatusObservable } from 'voa-shared/helpers/resilience'

import { offlineIndicator, offline, online, text } from './OfflineIndicator.scss'

export interface Props {
}

export interface State {
  isOnline: boolean
}

class OfflineIndicator extends React.Component<Props, State> {
  state: State = {
    isOnline: null,
  }

  private _subscription: Subscription

  componentWillMount () {
    this._subscription = onlineStatusObservable()
      .subscribe(({ online }) => {
        this.setState({ isOnline: online })
      })
  }

  componentWillUnmount () {
    this._subscription.unsubscribe()
  }

  render () {
    const { isOnline } = this.state

    if (isOnline === null && navigator.onLine) {
      return <div className={offlineIndicator} />
    } else if (!isOnline || !navigator.onLine) {
      return (
        <div className={`${offlineIndicator} ${offline}`}>
          <div className={text}>
            You are offline
          </div>
          <div className={text}>
            Some content may not load properly
          </div>
        </div>
      )
    } else {
      return (
        <div className={`${offlineIndicator} ${online}`}>
          <div className={text}>
            You are now online
          </div>
        </div>
      )
    }

  }
}

export default OfflineIndicator
