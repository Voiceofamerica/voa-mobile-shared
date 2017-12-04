
const timeoutPromise = new Promise(resolve => setTimeout(resolve, 3000))
const tapPromise = new Promise(resolve => {
  const touchHandler = () => {
    resolve()
    document.removeEventListener('touchstart', touchHandler)
  }

  document.addEventListener('touchstart', touchHandler)
})

const readyPromise = Promise.race([timeoutPromise, tapPromise])

export function ready () {
  return readyPromise
}
