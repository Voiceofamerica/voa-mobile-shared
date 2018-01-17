
import * as React from 'react'

export default class Spinner extends React.Component {
  render () {
    const { children, ...props } = this.props
    return (
      <div {...props}>{children}</div>
    )
  }
}
