
import * as React from 'react'

import { deviceIsReady } from './cordovaHelper'
import { startObservable } from './psiphonHelper'

const PROXY_ON: ADB.ProxyStatus = 'proxy_on'
const PROXY_OFF: ADB.ProxyStatus = 'proxy_off'

const mediaNames: ADB.MediaName[] = [
  'audio',
  'video',
]

const getProxyStatus = () => {
  return startObservable.getValue() ? PROXY_ON : PROXY_OFF
}

const baseStateOptions: ADB.BaseTrackStateOptions = {
  language: '', // Set from analytics options
  language_service: '', // Set from analytics options
  platform: 'news app',
  entity: 'voa',
  property_name: '', // Set from analytics options
  property_id: '', // Set from analytics options
  app_type: 'hybrid',
  get proxy_status () { return getProxyStatus() },
  rsid_acct: '', // Set from analytics options
}

const baseActionOptions: ADB.BaseTrackActionOptions = {
  language: '', // Set from analytics options
  language_service: '', // Set from analytics options
  platform: 'news app',
  entity: 'voa',
  property_name: '', // Set from analytics options
  property_id: '', // Set from analytics options
  app_type: 'hybrid',
  get proxy_status () { return getProxyStatus() },
  report_suite: '', // Set from analytics options
}

const articleToActionOptions = (opts: ArticleActionOpts): ADB.GeneratedTrackActionOptions => ({
  page_name: opts.articleTitle,
  content_type: 'article',
  section: '???',
  category: '???',
  page_title: opts.articleTitle,
  headline: opts.articleTitle,
  byline: opts.authors,
  pub_date: opts.pubDate,
  article_uid: opts.id,
  app_events: '???',
})

let optionsConfigured: () => void
export const analyticsOptionsReady = new Promise(resolve => {
  optionsConfigured = resolve
}).then(() => deviceIsReady)

export const adbReady = analyticsOptionsReady.then(() => {
  const ADB: ADB.AdbInterface = require('adobe-mobile-services/sdks/Cordova/ADBMobile/Shared/ADB_Helper')
  return ADB
})

export interface AppAnalyticsOptions {
  language: string
  languageService: string
  propertyName: string
  propertyId: string
  rsidAccount: string
  reportSuite: string
}

export function setAnalyticsOptions (opts: AppAnalyticsOptions) {
  baseActionOptions.language
  = baseStateOptions.language
  = opts.language

  baseActionOptions.language_service
  = baseStateOptions.language_service
  = opts.languageService

  baseActionOptions.property_name
  = baseStateOptions.property_name
  = opts.propertyName

  baseActionOptions.property_id
  = baseStateOptions.property_id
  = opts.propertyId

  baseStateOptions.rsid_acct = opts.rsidAccount

  baseActionOptions.report_suite = opts.reportSuite

  optionsConfigured()
}

export function trackState (type: string, options: ADB.GeneratedTrackStateOptions) {
  const fullOptions = {
    ...baseStateOptions,
    ...options,
  }

  if (dataLayer) {
    dataLayer.push(fullOptions)
    dataLayer.push({ appScreenView: type })
  }

  return adbReady.then((ADB) => {
    ADB.trackState(type, fullOptions)
  })
}

export function trackAction (type: string, options: ADB.GeneratedTrackActionOptions) {
  const fullOptions = {
    ...baseActionOptions,
    ...options,
  }

  if (dataLayer) {
    dataLayer.push(fullOptions)
    dataLayer.push({ appEvent: type })
  }

  return adbReady.then((ADB) => {
    ADB.trackAction(type, fullOptions)
  })
}

export interface ArticleActionOpts {
  id: string,
  articleTitle: string,
  authors: string,
  pubDate: string,
}

export function favoriteArticle (opts: ArticleActionOpts) {
  return trackAction('ARTICLE_TO_FAV', articleToActionOptions(opts))
}

export function shareArticle (opts: ArticleActionOpts & { shareType: string }) {
  return trackAction('ARTICLE_SHARED', {
    ...articleToActionOptions(opts),
    share_type: opts.shareType,
  })
}

export const analyticsHelper = {
  favoriteArticle,
  shareArticle,
}

export interface AnalyticsProps {
  analytics: typeof analyticsHelper
}

export type ItemType = 'article' | 'audio' | 'video'

export interface HOCAnalyticsOptions {
  skip?: boolean
  itemType?: ItemType
  state: string
  title: string
  contentType?: ADB.StateContentType
  section?: string
  byline?: string
  pubDate?: string
  articleId?: string | number
  searchKeyword?: string
  mediaType?: ADB.MediaType
}

function getVal<P> (item: HOCAnalyticsOptions | ((props: Readonly<P>, prevProps: Readonly<P>) => HOCAnalyticsOptions), props: Readonly<P>, prevProps: Readonly<P>): HOCAnalyticsOptions {
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
        this.fireState(getVal(options, this.props, {})).catch()
      }

      componentDidUpdate (prevProps: Readonly<P & Partial<AnalyticsProps>>) {
        this.fireState(getVal(options, this.props, prevProps)).catch()
      }

      render () {
        return (
          <Component analytics={analyticsHelper} { ...this.props }>
            {this.props.children}
          </Component>
        )
      }

      private fireState = (options: HOCAnalyticsOptions) => {
        const {
          skip = false,
          itemType,
          state,
          title,
          contentType = 'index',
          section = 'listing',
          byline,
          pubDate,
          articleId,
          searchKeyword,
          mediaType,
        } = options

        if (skip) {
          return Promise.resolve()
        }

        return trackState(state, {
          page_name: title,
          video_name: itemType === 'video' ? title : undefined,
          audio_name: itemType === 'audio' ? title : undefined,
          content_type: contentType,
          section: section,
          category: section,
          page_title: title,
          headline: itemType === 'article' ? title : undefined,
          byline: byline,
          pub_date: pubDate,
          article_uid: `${articleId}`,
          search_keyword: searchKeyword,
          media_type: mediaType,
          media_name: itemType && (itemType in mediaNames) ? itemType as ADB.MediaName : undefined,
        })
      }
    }
  }
}
