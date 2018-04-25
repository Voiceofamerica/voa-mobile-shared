
declare namespace ADB {
  export type StateContentType
    = 'opened app'
    | 'homepage'
    | 'audio index'
    | 'video index'
    | 'audio detail'
    | 'video detail'
    | 'Live Stream index'
    | 'search results'
    | 'about'
    | 'setting'
    | 'index'

  export type ActionContentType
    = 'article'
    | 'audio'
    | 'video'
    | 'clip'
    | 'search'
    | 'live blog'
    | 'settings'

  export type MediaType
    = 'onDemand'
    | 'live'

  export type MediaName
    = 'audio'
    | 'video'

  export type ProxyStatus
    = 'proxy_on'
    | 'proxy_off'

  export interface BaseTrackStateOptions {
    language: string
    language_service: string
    platform: 'news app'
    entity: 'voa'
    property_name: string
    property_id: string
    app_type: 'hybrid'
    proxy_status: ProxyStatus
    rsid_acct: string
  }

  export interface GeneratedTrackStateOptions {
    page_name: string
    video_name?: string
    audio_name?: string
    content_type: StateContentType
    section: string // ???
    category: string // ???
    page_title: string
    headline?: string
    byline?: string
    pub_date?: string
    article_uid?: string
    search_keyword?: string
    share_type?: string // ???
    media_type?: MediaType
    media_name?: MediaName
    app_events?: string // ???
  }

  export type TrackStateOptions
    = BaseTrackStateOptions
    & GeneratedTrackStateOptions

  export interface BaseTrackActionOptions {
    language: string
    language_service: string
    platform: 'news app'
    entity: 'voa'
    property_name: string
    property_id: string
    app_type: 'hybrid'
    proxy_status: ProxyStatus
    report_suite: string
  }

  export interface GeneratedTrackActionOptions {
    page_name: string
    video_name?: string
    audio_name?: string
    content_type: ActionContentType
    section: string // ???
    category: string // ???
    page_title: string
    headline?: string
    byline?: string
    pub_date?: string
    article_uid?: string
    search_keyword?: string
    share_type?: string
    media_type?: MediaType
    media_name?: MediaName
    app_events: string // ???
  }

  export type TrackActionOptions
    = BaseTrackActionOptions
    & GeneratedTrackActionOptions

  export interface AdbInterface {
    trackState<T> (path: string, options: TrackStateOptions & T)
    trackAction<T> (type: string, options: TrackActionOptions & T)
  }
}
