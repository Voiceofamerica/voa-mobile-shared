
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/operator/first'

import { deviceIsReady } from './cordovaHelper'

export interface VoaAdditionalData extends PhonegapPluginPush.NotificationEventAdditionalData {
  articleId?: string
}

export class InputError extends Error {
  constructor (
    public method: string,
    message?: string,
  ) {
    super(message)
  }
}

export class SubscriptionError extends Error {
  constructor (
    public topic: string,
    message?: string,
  ) {
    super(message)
  }
}

export class UnsubscriptionError extends Error {
  constructor (
    public topic: string,
    message?: string,
  ) {
    super(message)
  }
}

export interface VoaNotification extends PhonegapPluginPush.NotificationEventResponse {
  additionalData: VoaAdditionalData
}

export interface NotificationStatus {
  registrationId: string | null
  initialized: boolean
  subscriptions: string[]
}

export const notificationSubject = new ReplaySubject<VoaNotification>(10)
export const coldStartSubject = new ReplaySubject<VoaNotification>(1)

export const statusSubject = new BehaviorSubject<NotificationStatus>({
  registrationId: null,
  initialized: false,
  subscriptions: [],
})

// warn all errors created by this helper
statusSubject.subscribe(() => null, (err) => {
  console.warn('An error occurred in push notification helper:', err)
})

const updateStatus = (mapper: (oldStatus: NotificationStatus) => NotificationStatus) => {
  statusSubject.next(mapper(statusSubject.getValue()))
}

let initialized = false
const pushSubject = new ReplaySubject<PhonegapPluginPush.PushNotification>(1)
const pushOnce = pushSubject.first()

function initialize (topic?: string, senderID = '240913753196'): Observable<NotificationStatus> {
  const push = PushNotification.init({
    android: {
      senderID,
      sound: true,
      vibrate: true,
      topics: topic !== undefined ? [topic] : [],
    },
    ios: {
      alert: true,
      badge: true,
      sound: true,
      clearBadge: true,
      topics: topic !== undefined ? [topic] : [],
    },
  })

  push.on('registration', ({ registrationId }) => {
    console.log('Push notification registration id:', registrationId)
    updateStatus(status => ({
      ...status,
      registrationId,
      initialized: true,
    }))
  })
  push.on('notification', handleNotification)
  push.on('error', e => {
    console.error('Notification error:', e)
    statusSubject.error(e)
  })

  pushSubject.next(push)
  initialized = true

  return statusSubject.asObservable()
}

function handleNotification (data: VoaNotification) {
  if (data.additionalData.coldstart) {
    coldStartSubject.next(data)
  } else {
    notificationSubject.next(data)
  }

  pushOnce.subscribe(push => {
    push.finish(
      () => {
        console.log('processing of push data is finished')
      },
      () => {
        console.log(
          'something went wrong with push.finish for ID:',
          data.additionalData.notId,
        )
      },
      data.additionalData.notId,
    )
  })
}

export function subscribeToTopic (topic: string, attemptsRemaining = 5, debounce = 3000): Observable<NotificationStatus> {
  if ((topic as any) === undefined || (topic as any) === null) {
    statusSubject.error(new InputError (subscribeToTopic.name, `topic cannot be null or undefined`))
    return statusSubject
  }

  pushOnce.subscribe(push => {
    function trySubscribe () {
      push.subscribe(
        topic,
        () => {
          console.log('success subscribing to topic')
          updateStatus(({ subscriptions, ...status }) => ({
            ...status,
            subscriptions: [
              ...subscriptions,
              topic,
            ],
          }))
        },
        () => {
          console.log('error subscribing to topic')
          if (attemptsRemaining === 0) {
            statusSubject.error(new SubscriptionError(topic))
          } else {
            attemptsRemaining--
            setTimeout(trySubscribe, debounce)
          }
        },
      )
    }

    trySubscribe()
  })

  return statusSubject.asObservable()
}

export function unsubscribeFromTopic (topic: string, attemptsRemaining = 5, debounce = 3000) {
  if ((topic as any) === undefined || (topic as any) === null) {
    statusSubject.error(new InputError (unsubscribeFromTopic.name, `topic cannot be null or undefined`))
    return statusSubject
  }

  pushOnce.subscribe(push => {
    function tryUnsubscribe () {
      push.unsubscribe(
        topic,
        () => {
          console.log('success unsubscribing from topic')
          updateStatus(({ subscriptions, ...status }) => ({
            ...status,
            subscriptions: subscriptions.filter(t => t !== topic),
          }))
        },
        () => {
          console.log('error unsubscribing from topic')
          if (attemptsRemaining === 0) {
            statusSubject.error(new UnsubscriptionError(topic))
          } else {
            attemptsRemaining--
            setTimeout(tryUnsubscribe, debounce)
          }
        },
      )
    }

    tryUnsubscribe()
  })

  return statusSubject.asObservable()
}

export function initializeNotifications (topic?: string, senderID?: string): Observable<NotificationStatus> {
  if (initialized) {
    return statusSubject.asObservable()
  }

  deviceIsReady.then(() => {
    if (initialized) {
      return
    }
    initialize(topic, senderID)
  }).catch()

  return statusSubject.asObservable()
}
