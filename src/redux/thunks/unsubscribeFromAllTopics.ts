
import { Dispatch } from 'redux'

import setNotificationStatus from '../actions/setNotificationStatus'
import { unsubscribeFromTopic, statusSubject } from '../../helpers/pushNotificationHelper'

export interface UnsubscribeFromAllTopicsOptions {
}

export default () => (dispatch: Dispatch<any>) => {
  const status = statusSubject.getValue()
  dispatch(
    setNotificationStatus({
      shouldGetPushNotifications: false,
    }),
  )

  status.subscriptions.forEach(topic => {
    const sub = unsubscribeFromTopic(topic).subscribe(status => {
      if (status.initialized && !status.subscriptions.some(t => t === topic)) {
        sub.unsubscribe()
      }
    })
  })
}
