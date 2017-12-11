
const timeoutPromise = new Promise(resolve => setTimeout(resolve, 3000))
const tapPromise = new Promise(resolve => {
  const touchHandler = () => {
    resolve()
    document.removeEventListener('touchend', touchHandler)
  }

  document.addEventListener('touchend', touchHandler)
})

const readyPromise = Promise.race([timeoutPromise, tapPromise])

export function ready () {
  return readyPromise
}
