
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

export type TextDirection = 'rtl' | 'ltr'

let textDirection: TextDirection = 'ltr'
export const directionObservable = new BehaviorSubject<TextDirection>(textDirection)

export const setDirection = (dir: TextDirection) => {
  textDirection = dir
  directionObservable.next(dir)
}
