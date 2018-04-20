
import * as React from 'react'

import { startObservable } from './psiphonHelper'

export let ADB: AdbInterface

if (typeof (cordova as any) !== 'undefined') {
  ADB = require('adobe-mobile-services/sdks/Cordova/ADBMobile/Shared/ADB_Helper')
}

export interface AppAnalyticsOptions {
  language: string
}

let analyticsOptions: AppAnalyticsOptions | undefined = undefined

export function setAnalyticsOptions (opts: AppAnalyticsOptions) {
  analyticsOptions = opts
}

export type ProxyStatus = 'proxy_on' | 'proxy_off'
const PROXY_ON: ProxyStatus = 'proxy_on'
const PROXY_OFF: ProxyStatus = 'proxy_off'

export interface TrackStateOptions {
  language: string
  section: string
  content_type: string
  page_title: string
  page_name: string
  article_uid?: string
  audio_name?: string
  video_name?: string
  proxy_status: ProxyStatus
}

export interface TrackActionOptions {
  language: string
  content_type: string
  page_title: string
  page_name: string
  section?: string
  category?: string
  headline?: string
  article_uid?: string
  proxy_status: ProxyStatus
}

const getProxyStatus = () => {
  return startObservable.getValue() ? PROXY_ON : PROXY_OFF
}

export interface AdbInterface {
  trackState<T> (path: string, options: TrackStateOptions & T)
  trackAction<T> (type: string, options: TrackActionOptions & T)
}

export function favoriteArticle (opts: { id: string, articleTitle: string, authors: string }) {
  ADB && ADB.trackAction('ARTICLE_TO_FAV', {
    language: analyticsOptions!.language,
    content_type: 'article',
    article_uid: opts.id,
    page_title: opts.articleTitle,
    page_name: opts.articleTitle,
    headline: opts.articleTitle,
    byline: opts.authors,
    proxy_status: getProxyStatus(),
  })
}

export function shareArticle (opts: { id: string, articleTitle: string, authors: string }) {
  ADB && ADB.trackAction('ARTICLE_SHARED', {
    language: analyticsOptions!.language,
    content_type: 'article',
    article_uid: opts.id,
    page_title: opts.articleTitle,
    page_name: opts.articleTitle,
    headline: opts.articleTitle,
    byline: opts.authors,
    proxy_status: getProxyStatus(),
  })
}

export const analyticsHelper = {
  favoriteArticle,
  shareArticle,
}

export interface AnalyticsProps {
  analytics: typeof analyticsHelper
}

export interface HOCAnalyticsOptions {
  state: string
  title: string
  section?: string
  type?: string
  skip?: boolean
}

function getVal<P> (item: HOCAnalyticsOptions | ((props: Readonly<P>, prevProps: Readonly<P>) => HOCAnalyticsOptions), props: P, prevProps: P): HOCAnalyticsOptions {
  if (typeof item === 'object') {
    return item
  } else if (typeof (item as any) === 'function') {
    return item(props, prevProps)
  } else {
    throw new Error(`Unexpected value type ${typeof item}`)
  }
}

export default function analytics<P = {}> (options: HOCAnalyticsOptions | ((props: P & Partial<AnalyticsProps>, newProps: P & Partial<AnalyticsProps>) => HOCAnalyticsOptions)) {
  return function (Component: React.ComponentType<P & AnalyticsProps>): React.ComponentType<P> {
    return class AnalyticsComponent extends React.Component<P & Partial<AnalyticsProps>> {
      componentDidMount () {
        const {
          state,
          title,
          section = 'listing',
          type = 'index',
          skip = false,
        } = getVal(options, this.props, {})

        if (skip) {
          return
        }

        ADB && ADB.trackState(state, {
          language: analyticsOptions!.language,
          section: section,
          content_type: type,
          page_title: title,
          page_name: title,
          proxy_status: getProxyStatus(),
        })
      }

      componentWillReceiveProps (nextProps: Readonly<P & Partial<AnalyticsProps>>) {
        const {
          state,
          title,
          section = 'listing',
          type = 'index',
          skip = false,
        } = getVal(options, nextProps, this.props)
        if (skip) {
          return
        }

        ADB && ADB.trackState(state, {
          language: analyticsOptions!.language,
          section: section,
          content_type: type,
          page_title: title,
          page_name: title,
          proxy_status: getProxyStatus(),
        })
      }

      render () {
        return (
          <Component analytics={analyticsHelper} { ...this.props }>
            {this.props.children}
          </Component>
        )
      }
    }
  }
}
