
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/distinctUntilChanged'

import * as OrigPsi from 'psiphon-cordova-plugin/www/psiphon.d'

import { deviceIsReady, appResumeObservable, __HOST__ } from './cordovaHelper'

let psiphonPromise: Promise<typeof OrigPsi>
const getPsiphon = () => {
  if (!psiphonPromise) {
    psiphonPromise = new Promise<typeof OrigPsi>((resolve, reject) => {
      try {
        const psiphon = require('psiphon-cordova-plugin/www/psiphon')
        resolve(psiphon)
      } catch (e) {
        reject(e)
      }
    })
  }

  return psiphonPromise
}

const noop = () => null

let psiphonConfig: any
let configPromise: Promise<void>
export function setPsiphonConfig (config: any) {
  psiphonConfig = config
  configPromise = deviceIsReady
    .then(getPsiphon)
    .then((psiphon) => new Promise<void>((resolve, reject) => {
      console.log('configuring psiphon')
      psiphon.config(psiphonConfig, resolve, reject)
    }))
}

const baseStartObservable = new Observable<boolean>((sub) => {
  if (__HOST__) {
    sub.next(false)
    return () => null
  }

  const resumeSub = appResumeObservable.subscribe(() => {
    console.log('resuming psiphon')
    getPsiphon()
    .then(psiphon => psiphon.start(() => sub.next(true), (err) => sub.error(err)))
    .catch(noop)
  })

  configPromise.then(() => {
    console.log('starting psiphon')
    return getPsiphon()
    .then(psiphon => psiphon.start(() => sub.next(true), (err) => sub.error(err)))
  }).catch((err) => {
    console.error('something went wrong configuring psiphon', err)
    sub.error(err)
  })

  return () => {
    resumeSub.unsubscribe()
  }
})

export const startObservable = new BehaviorSubject(false)
export const toggleObservable = startObservable.distinctUntilChanged()
let startSubscription: Subscription | undefined

export function start (): Promise<void> {
  if (__HOST__) {
    return Promise.resolve()
  }

  if (!psiphonConfig || !configPromise) {
    return Promise.reject(new Error('You must configure psiphon before you can start it'))
  }

  return configPromise.then(() => {
    if (!startSubscription || startSubscription.closed) {
      startSubscription = baseStartObservable.subscribe(startObservable)
    }

    return new Promise<void>((resolve, reject) => {
      startObservable
        .first(started => started)
        .subscribe(
          () => resolve(),
          (err) => reject(err),
        )
    })
  })
}

export function pause (): Promise<void> {
  if (startSubscription) {
    startSubscription.unsubscribe()
    startSubscription = undefined
    startObservable.next(false)
  }

  return configPromise.then(() => {
    return new Promise<void>((resolve, reject) => {
      console.log('pausing psiphon')
      getPsiphon()
      .then(psiphon => psiphon.pause(resolve, reject))
      .catch(reject)
    })
  })
}

export function port (): Promise<number> {
  return configPromise.then(() => {
    return new Promise<number>((resolve, reject) => {
      console.log('getting psiphon port')
      getPsiphon()
      .then(psiphon => psiphon.port(([portNumber]) => resolve(portNumber), reject))
      .catch(reject)
    })
  })
}
