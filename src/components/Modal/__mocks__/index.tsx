
import * as React from 'react'

export default (props) => (
  React.createElement('modal', { props }, props.children)
)
export const ModalButton = (props) => (
  React.createElement('modal-button', { props }, props.children)
)
