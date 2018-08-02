
import { Dispatch } from 'redux'

import setNotificationStatus from '../actions/setNotificationStatus'
import { subscribeToTopic, unsubscribeFromTopic, statusSubject } from '../../helpers/pushNotificationHelper'

export interface ChangeNotificationTopicOptions {
  topic: string
}

export default (options: ChangeNotificationTopicOptions) => (dispatch: Dispatch<any>) => {
  const { topic } = options

  const status = statusSubject.getValue()
  dispatch(
    setNotificationStatus({
      shouldGetPushNotifications: true,
    }),
  )

  status.subscriptions
    .filter(t => t !== topic)
    .forEach(topic => {
      const sub = unsubscribeFromTopic(topic).subscribe(status => {
        if (status.initialized && !status.subscriptions.some(t => t === topic)) {
          sub.unsubscribe()
        }
      })
    })

  if (!status.subscriptions.some(t => t === topic)) {
    const sub = subscribeToTopic(topic).subscribe(status => {
      if (status.initialized && status.subscriptions.some(t => t === topic)) {
        sub.unsubscribe()
      }
    })
  }
}
