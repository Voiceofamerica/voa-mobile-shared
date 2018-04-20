
export function fixDefault<T> (mainImport: any) {
  return (mainImport.default ? mainImport.default : mainImport) as T
}
