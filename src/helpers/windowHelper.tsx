
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/throttleTime'
import 'rxjs/add/operator/debounceTime'

const baseResizeObservable = new Observable<[number, number]>(sub => {
  window.addEventListener('resize', (ev) => {
    const view = ev.view || window
    sub.next([view.innerWidth, view.innerHeight])
  })
})

const resizeBehavior = new BehaviorSubject([window.innerWidth, window.innerHeight])
baseResizeObservable.subscribe(resizeBehavior)

const DEBOUNCE_TIME = 100

export const resizeObservable = Observable.merge(
  resizeBehavior.throttleTime(DEBOUNCE_TIME),
  resizeBehavior.debounceTime(DEBOUNCE_TIME),
)
