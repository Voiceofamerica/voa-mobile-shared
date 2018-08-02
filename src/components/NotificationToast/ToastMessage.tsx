
import * as React from 'react'

import {
  VoaNotification,
} from '../../helpers/pushNotificationHelper'

import {
  toastDismiss,
  toastMessage,
  toastMore,
  toastTitle,
} from './NotificationToast.scss'

export interface ToastMessageProps {
  notification: VoaNotification
  goToArticle: (id: string | undefined) => void
  closeToast?: () => void
}

export default function ToastMessage ({ notification, goToArticle, closeToast }: ToastMessageProps) {
  return (
    <div>
      <div className={toastTitle}>{notification.title}</div>
      <div className={toastMessage}>{notification.message}</div>
      {notification.additionalData.articleId ? (
        <a
          className={toastMore}
          onClick={() => goToArticle(notification.additionalData.articleId)}
        >
          Read more ...
        </a>
      ) : null}
      <button className={toastDismiss} onClick={closeToast}>
        Dismiss
      </button>
    </div>
  )
}
