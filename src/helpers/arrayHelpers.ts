
export function unique<T> (array: T[]) {
  return array.filter((value, index, self) => (
    self.indexOf(value) === index
  ))
}

export function except<T> (array: T[], ...vals: any[]) {
  return array.filter(val => !vals.includes(val))
}

export function only<T> (array: T[], ...vals: any[]) {
  return array.filter(val => vals.includes(val))
}
