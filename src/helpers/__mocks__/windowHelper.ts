
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

let subscriber
(window as any).innerWidth = 500

export function setWindowWidth (width) {
  (window as any).innerWidth = width
  subscriber.next({ width })
}

const widthObserver = new Observable((sub) => {
  subscriber = sub
})

export function resize () {
  return widthObserver
}
