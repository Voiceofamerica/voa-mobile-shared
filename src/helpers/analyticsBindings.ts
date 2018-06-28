
import '../customTypings/adb'
import { deviceIsReady } from './cordovaHelper'
import { startObservable } from './psiphonHelper'

const PROXY_ON: ADB.ProxyStatus = 'proxy_on'
const PROXY_OFF: ADB.ProxyStatus = 'proxy_off'

const getProxyStatus = () => {
  return startObservable.getValue() ? PROXY_ON : PROXY_OFF
}

let googleAnalyticsId: string | undefined

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

export interface ArticleActionOpts {
  articleId: string
  articleTitle: string
  authors: string
  pubDate: string
}

export const articleToActionOptions = (opts: ArticleActionOpts): ADB.GeneratedTrackActionOptions => ({
  page_name: opts.articleTitle,
  content_type: 'article',
  section: '???',
  category: '???',
  page_title: opts.articleTitle,
  headline: opts.articleTitle,
  byline: opts.authors,
  pub_date: opts.pubDate,
  article_uid: opts.articleId,
  app_events: '???',
})

export interface ArticleAudioActionOpts extends ArticleActionOpts {
  audioTitle: string
}

export const articleAudioToActionOptions = (opts: ArticleAudioActionOpts): ADB.GeneratedTrackActionOptions => ({
  ...articleToActionOptions(opts),
  content_type: 'audio',
  audio_name: opts.audioTitle,
  media_type: 'onDemand',
  media_name: 'audio',
})

export interface ArticleVideoActionOpts extends ArticleActionOpts {
  videoTitle: string
}

export const articleVideoToActionOptions = (opts: ArticleVideoActionOpts): ADB.GeneratedTrackActionOptions => ({
  ...articleToActionOptions(opts),
  content_type: 'video',
  video_name: opts.videoTitle,
  media_type: 'onDemand',
  media_name: 'video',
})

export interface ProgramActionOpts {
  mediaTitle: string
  contentType: ADB.MediaName
  type: ADB.MediaType
}

export const programToActionOptions = (opts: ProgramActionOpts): ADB.GeneratedTrackActionOptions => ({
  page_name: opts.mediaTitle,
  content_type: opts.contentType,
  section: '???',
  category: '???',
  page_title: opts.mediaTitle,
  media_type: opts.type,
  media_name: opts.contentType,
  app_events: '???',
})

export interface SearchActionOpts {
  pageTitle: string
  searchQuery: string
}

export const searchToActionOptions = (opts: SearchActionOpts): ADB.GeneratedTrackActionOptions => ({
  page_name: opts.pageTitle,
  content_type: 'search',
  section: '???',
  category: '???',
  page_title: opts.pageTitle,
  search_keyword: opts.searchQuery,
  app_events: '???',
})

export interface SetProxyOpts {
  pageTitle: string
  enabled: boolean
}

export const setProxyToActionOptions = (opts: SetProxyOpts): ADB.GeneratedTrackActionOptions => ({
  page_name: opts.pageTitle,
  content_type: 'settings',
  section: '???',
  category: '???',
  page_title: opts.pageTitle,
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
  googleAnalyticsId?: string
}

export function setAnalyticsOptions (opts: AppAnalyticsOptions) {
  googleAnalyticsId = opts.googleAnalyticsId

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
  return adbReady.then((ADB) => {
    const fullOptions = {
      ...baseStateOptions,
      ...options,
    }

    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        ...fullOptions,
        action: type,
        GoogleAnalyticsID: googleAnalyticsId,
      })
      dataLayer.push({
        event: 'appScreenView',
        action: type,
        GoogleAnalyticsID: googleAnalyticsId,
      })
    }

    ADB.trackState(type, fullOptions)
  })
}

export function trackAction (type: string, options: ADB.GeneratedTrackActionOptions) {
  return adbReady.then((ADB) => {
    const fullOptions = {
      ...baseActionOptions,
      ...options,
    }

    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        ...fullOptions,
        action: type,
        GoogleAnalyticsID: googleAnalyticsId,
      })
      dataLayer.push({
        event: 'appEvent',
        action: type,
        GoogleAnalyticsID: googleAnalyticsId,
      })
    }

    ADB.trackAction(type, fullOptions)
  })
}
