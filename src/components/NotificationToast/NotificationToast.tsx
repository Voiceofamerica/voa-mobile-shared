import * as React from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { Subscription } from 'rxjs/Subscription'

import {
  notificationSubject,
  VoaNotification,
} from '../../helpers/pushNotificationHelper'

import {
  notificationToast,
  toastText,
} from './NotificationToast.scss'

import ToastMessage from './ToastMessage'

export interface Props {
  goToArticle: (id: string | undefined) => void
}

export interface State {
  toastId: number | null
}

export default class NotificationToast extends React.Component<Props, State> {
  private notificationSubscription: Subscription

  componentDidMount () {
    this.notificationSubscription = notificationSubject.subscribe(this.handleToastNotification)
  }

  componentWillUnmount () {
    this.notificationSubscription.unsubscribe()
  }

  render () {
    return (
      <div className={notificationToast}>
        <ToastContainer
          transition={Slide}
          autoClose={false}
          position={'top-center'}
          closeButton={false}
        />
      </div>
    )
  }

  private handleToastNotification = (data: VoaNotification) => {
    const toastId = toast(
      <ToastMessage
        notification={data}
        closeToast={() => toast.dismiss(toastId)}
        goToArticle={this.props.goToArticle}
      />,
      {
        bodyClassName: toastText,
      },
    )
  }
}
