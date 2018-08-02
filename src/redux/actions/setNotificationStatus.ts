
import { Action } from 'redux'

export const type = '@voiceofamerica/voa-shared:SET_NOTIFICATION_STATUS'

export interface SetNotificationStatusOptions {
  shouldGetPushNotifications: boolean
}

export type SetNotificationStatusAction = SetNotificationStatusOptions & Action

export default (options: SetNotificationStatusOptions): SetNotificationStatusAction => ({
  ...options,
  type,
})
