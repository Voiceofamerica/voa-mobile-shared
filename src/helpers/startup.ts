
const timeoutPromise = new Promise(resolve => setTimeout(resolve, 3000))
const tapPromise = new Promise(resolve => {
  const touchHandler = () => {
    setTimeout(() => {
      resolve()
      document.removeEventListener('click', touchHandler)
    }, 50)
  }

  document.addEventListener('click', touchHandler)
})

const readyPromise = Promise.race([timeoutPromise, tapPromise])

export function ready () {
  return readyPromise
}
