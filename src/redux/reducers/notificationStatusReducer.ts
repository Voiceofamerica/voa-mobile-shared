
import { AnyAction } from 'redux'

import {
  type as setNotificationStatusType,
  SetNotificationStatusAction,
} from '../actions/setNotificationStatus'

import { ActorMap, buildReducer } from '../actorMap'
import NotificationStatus from '../types/NotificationStatus'

const actors: ActorMap<NotificationStatus> = {
  [setNotificationStatusType]: (prev, { shouldGetPushNotifications }: SetNotificationStatusAction) => ({
    ...prev,
    shouldGetPushNotifications,
  }),
}

export const INITIAL_STATE: NotificationStatus = {
  shouldGetPushNotifications: undefined,
}

export default buildReducer(INITIAL_STATE, actors)
