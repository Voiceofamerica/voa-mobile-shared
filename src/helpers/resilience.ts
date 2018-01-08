
import { Observable } from 'rxjs/Observable'

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

export const onlineStatusObservable: Observable<OnlineStatus> = new Observable((subscriber) => {
  const onlineHandler = () => {
    subscriber.next(ONLINE)
  }
  const offlineHandler = () => {
    subscriber.next(OFFLINE)
  }

  window.addEventListener('online', onlineHandler)
  document.addEventListener(CUSTOM_ONLINE, onlineHandler)

  window.addEventListener('offline', offlineHandler)
  document.addEventListener(CUSTOM_OFFLINE, offlineHandler)

  return () => {
    window.removeEventListener('online', onlineHandler)
    document.removeEventListener(CUSTOM_ONLINE, onlineHandler)

    window.removeEventListener('offline', offlineHandler)
    document.removeEventListener(CUSTOM_OFFLINE, offlineHandler)
  }
})

onlineStatusObservable.subscribe(({ online }) => {
  if (online) {
    callbacks.forEach(cb => {
      setTimeout(cb)
    })
    callbacks.splice(0)
  }
})

let previousOnlineState = navigator.onLine
setInterval(() => {
  if (navigator.onLine !== previousOnlineState) {
    previousOnlineState = navigator.onLine

    const ev = new CustomEvent(navigator.onLine ? CUSTOM_ONLINE : CUSTOM_OFFLINE)
    document.dispatchEvent(ev)
  }
}, 300)
