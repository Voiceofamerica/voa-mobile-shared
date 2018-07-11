import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { AsyncSubject } from 'rxjs/AsyncSubject'
import { of } from 'rxjs/observable/of'

export interface VoaAdditionalData extends PhonegapPluginPush.NotificationEventAdditionalData {
  articleId?: string
}

export interface VoaNotification extends PhonegapPluginPush.NotificationEventResponse {
  additionalData: VoaAdditionalData
}

export const notificationSubject = new ReplaySubject<VoaNotification>(10)

let push: PhonegapPluginPush.PushNotification | null = null

export enum NotificationStatus {
  initialized,
  subscribed,
  failed,
}

function initialize (initOptions: PhonegapPluginPush.InitOptions, topic?: string): Observable<boolean> {
  const initSubject = new AsyncSubject<boolean>()

  push = PushNotification.init(initOptions)

  push.on('registration', data => {
    console.log('Push notification registration id:', data.registrationId)
    subscribeToTopic(topic).subscribe(initSubject)
  })
  push.on('notification', handleNotification)
  push.on('error', e => console.error('Notification error:', e))

  return initSubject.asObservable()
}

function handleNotification (data: VoaNotification) {
  notificationSubject.next(data)
  push!.finish(
    () => {
      console.log('processing of push data is finished')
    },
    () => {
      console.log(
        'something went wrong with push.finish for ID =',
        data.additionalData.notId,
      )
    },
    data.additionalData.notId,
  )
}

export function subscribeToTopic (topic: string | undefined): Observable<boolean> {
  const subscribeObservable = new ReplaySubject<boolean>()

  if (topic && push) {
    push.subscribe(
      topic,
      () => {
        console.log('success subscribing to topic')
        subscribeObservable.next(true)
      },
      () => {
        console.log('error subscribing to topic')
        subscribeObservable.next(false)
      },
    )
  } else {
    return of(false)
  }

  return subscribeObservable
}

export function unsubscribeFromTopic (topic: string) {
  const unsubscribeObservable = new ReplaySubject<boolean>()

  if (topic && push) {
    push.unsubscribe(
      topic,
      () => {
        console.log('success subscribing to topic')
        unsubscribeObservable.next(true)
      },
      () => {
        console.log('error subscribing to topic')
        unsubscribeObservable.next(false)
      },
    )
  } else {
    return of(false)
  }

  return unsubscribeObservable
}

export function initializeNotifications (initOptions: PhonegapPluginPush.InitOptions, topic?: string): Observable<NotificationStatus> {
  const initilizationObservable = new ReplaySubject<NotificationStatus>()

  if (push === null) {
    document.addEventListener('deviceready', () => {
      initialize(initOptions, topic).subscribe(status =>
        initilizationObservable.next(
          status ? NotificationStatus.subscribed : NotificationStatus.failed,
        ),
      )
    })
  } else {
    return of(NotificationStatus.initialized)
  }

  return initilizationObservable
}
