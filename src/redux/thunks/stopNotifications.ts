
import { Dispatch } from 'redux'

import setNotificationStatus from '../actions/setNotificationStatus'
import { unsubscribeFromTopic, statusSubject } from '../../helpers/pushNotificationHelper'

export interface StopNotificationsOptions {
  topic: string
}

export default (options: StopNotificationsOptions) => (dispatch: Dispatch<any>) => {
  const { topic } = options

  const status = statusSubject.getValue()
  if (!status.subscriptions.some(t => t === topic)) {
    return
  }

  if (status.subscriptions.length === 1) {
    dispatch(
      setNotificationStatus({
        shouldGetPushNotifications: false,
      }),
    )
  }

  const sub = unsubscribeFromTopic(topic).subscribe(status => {
    if (status.initialized && !status.subscriptions.some(t => t === topic)) {
      sub.unsubscribe()
    }
  })
}
