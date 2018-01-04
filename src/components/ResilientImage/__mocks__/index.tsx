
import * as React from 'react'

export default jest.fn(({ children, ...props}) => (<div {...props}>{children}</div>))
