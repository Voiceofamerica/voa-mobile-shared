
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
export { Subscription } from 'rxjs/Subscription'

const CUSTOM_ONLINE = 'ONL'
const CUSTOM_OFFLINE = 'OFFL'

const callbacks: (() => void)[] = []
export function onConnectOnce (callback: () => void) {
  callbacks.push(callback)
}

export function waitUntilOnline (): Promise<void> {
  if (navigator.onLine) {
    return Promise.resolve()
  } else {
    return new Promise(resolve => onConnectOnce(resolve))
  }
}

export type OnlineStatusString = 'online' | 'offline'
export interface OnlineStatus {
  online: boolean
  status: OnlineStatusString
}

const ONLINE: OnlineStatus = {
  online: true,
  status: 'online',
}

const OFFLINE: OnlineStatus = {
  online: false,
  status: 'offline',
}

const nativeSupport = ('online' in window && 'offline' in window)

const baseObservable = new Observable<OnlineStatus>((subscriber) => {
  const onlineHandler = () => {
    subscriber.next(ONLINE)
  }
  const offlineHandler = () => {
    subscriber.next(OFFLINE)
  }

  if (nativeSupport) {
    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)
  } else {
    document.addEventListener(CUSTOM_ONLINE, onlineHandler)
    document.addEventListener(CUSTOM_OFFLINE, offlineHandler)
  }

  return () => {
    if (nativeSupport) {
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', offlineHandler)
    } else {
      document.removeEventListener(CUSTOM_ONLINE, onlineHandler)
      document.removeEventListener(CUSTOM_OFFLINE, offlineHandler)
    }
  }
})

export const onlineStatusObservable = new BehaviorSubject<OnlineStatus>(navigator.onLine ? ONLINE : OFFLINE)
baseObservable.subscribe(onlineStatusObservable)

onlineStatusObservable.subscribe(({ online }) => {
  if (online) {
    callbacks.forEach(cb => {
      setTimeout(cb)
    })
    callbacks.splice(0)
  }
})

if (!nativeSupport) {
  let previousOnlineState = navigator.onLine
  setInterval(() => {
    if (navigator.onLine !== previousOnlineState) {
      previousOnlineState = navigator.onLine

      const ev = new CustomEvent(navigator.onLine ? CUSTOM_ONLINE : CUSTOM_OFFLINE)
      document.dispatchEvent(ev)
    }
  }, 300)
}
