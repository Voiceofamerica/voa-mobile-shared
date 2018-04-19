
import * as React from 'react'

export default (props) => (
  React.createElement('ticket', { props }, props.children)
)

export const TICKET_HEIGHT = 100
