
declare var __DEV__: boolean

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
