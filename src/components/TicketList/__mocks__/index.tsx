
import * as React from 'react'

function TicketList (props) {
  return (
    React.createElement('ticket-list', { props }, props.children)
  )
}

namespace TicketList {
  const Static = (props) => (
    React.createElement('static-ticket-list', { props }, props.children)
  )
}

export default TicketList
