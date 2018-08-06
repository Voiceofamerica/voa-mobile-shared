
import { ReplaySubject } from 'rxjs/ReplaySubject'

export const errorObservable = new ReplaySubject<Error>(10)
window.addEventListener('error', ev => {
  errorObservable.next(ev.error)
})
