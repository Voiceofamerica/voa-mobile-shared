
import { Dispatch } from 'redux'

import setNotificationStatus from '../actions/setNotificationStatus'
import { subscribeToTopic } from '../../helpers/pushNotificationHelper'

export interface StartNotificationsOptions {
  topic: string
}

export default (options: StartNotificationsOptions) => (dispatch: Dispatch<any>) => {
  const { topic } = options

  dispatch(
    setNotificationStatus({
      shouldGetPushNotifications: true,
    }),
  )

  const sub = subscribeToTopic(topic).subscribe(status => {
    if (status.initialized && status.subscriptions.some(t => t === topic)) {
      sub.unsubscribe()
    }
  })
}
