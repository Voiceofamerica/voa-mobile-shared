
export default (req: typeof require) => {
  if (!req.context) {
    const emptyContext: any = (key) => key
    emptyContext.keys = () => []
    req.context = () => emptyContext
  }
}
