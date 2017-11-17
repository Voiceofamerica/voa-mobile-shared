
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/observable/merge'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/bufferTime'
import 'rxjs/add/operator/bufferCount'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/debounceTime'

export interface WindowSize {
  width: number
  height: number
}

const resizeObservable = Observable.fromEvent<UIEvent>(window, 'resize')
export function resize (): Observable<WindowSize> {
  return resizeObservable.map(ev => {
    const { innerWidth: width, innerHeight: height } = window

    return {
      width,
      height,
    }
  })
}

const keypressObservable = Observable.fromEvent<KeyboardEvent>(window, 'keydown')
export function keypress (): Observable<KeyboardEvent> {
  return keypressObservable
}

let menuObservable = new Observable<void>()
export function menu (): Observable<void> {
  return menuObservable
}

if (__DEV__) {
  document.addEventListener('deviceready', () => {
    const menuButtonObservable = new Observable<void>(subscriber => {
      (navigator as any).app.overrideButton('menubutton', true)
      document.addEventListener('menubutton', subscriber.next.bind(subscriber), false)
    })

    const motionObservable = Observable.fromEvent<DeviceOrientationEvent>(window, 'deviceorientation')
    const motionScalarObservable =
      motionObservable.bufferTime(50)
        .map(events => {
          if (!events || events.length < 1) {
            return 0
          }

          if (!events[0].absolute) {
            type DiffVal = { prev: number, val: number }
            const measureDiff = (key: string) => (diff: DiffVal, ev: any): DiffVal => {
              if (diff === null) {
                return {
                  prev: ev[key],
                  val: 0,
                }
              } else {
                return {
                  prev: ev[key],
                  val: diff.val + Math.abs(ev[key] - diff.prev),
                }
              }
            }

            const diffAlpha = events.reduce(measureDiff('alpha'), null).val
            const diffBeta = events.reduce(measureDiff('beta'), null).val
            const diffGamma = events.reduce(measureDiff('gamma'), null).val

            return Math.sqrt(diffAlpha * diffAlpha + diffBeta * diffBeta + diffGamma * diffGamma)
          } else {
            const diffAlpha = events.reduce((total, ev) => total + Math.abs(ev.alpha), 0)
            const diffBeta = events.reduce((total, ev) => total + Math.abs(ev.beta), 0)

            return Math.sqrt(diffAlpha * diffAlpha + diffBeta * diffBeta)
          }
        })

    const MIN_SHAKE = 25
    const shakeObservable = motionScalarObservable.bufferCount(2, 1)
      .filter(amts => amts.reduce((pass, amt) => pass && amt > MIN_SHAKE, true))

    menuObservable = Observable
      .merge<void>(menuButtonObservable, shakeObservable)
      .debounceTime(300)
  })
}
