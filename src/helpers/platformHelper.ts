
import { deviceIsReady, __HOST__, hostReady } from './cordovaHelper'

export function isAndroid (): boolean {
  if (isWeb()) {
    return false
  }

  return device.platform.toLowerCase() === 'android'
}

export function isIos (): boolean {
  if (isWeb()) {
    return false
  }

  return device.platform.toLowerCase() === 'ios'
}

export function isWeb (): boolean {
  return typeof (device as any) === 'undefined'
}

hostReady.then(() => {
  document.body.classList.add('ready', 'web')
})

deviceIsReady.then(() => {
  if (isIos()) {
    document.body.classList.add('ready', 'ios')
  } else if (isAndroid()) {
    document.body.classList.add('ready', 'android')
  } else {
    document.body.classList.add('ready', 'platform-unknown')
  }
}).catch(err => {
  console.error('FATAL: cordova failed to initialize', err)
})
