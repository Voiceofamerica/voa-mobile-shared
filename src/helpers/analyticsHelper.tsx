
import '../customTypings/adb'
import * as React from 'react'

import {
  ArticleActionOpts,
  articleToActionOptions,
  ArticleAudioActionOpts,
  articleAudioToActionOptions,
  ArticleVideoActionOpts,
  articleVideoToActionOptions,
  SearchActionOpts,
  searchToActionOptions,
  SetProxyOpts,
  setProxyToActionOptions,
  trackAction,
  trackState,
} from './analyticsBindings'

export function articleDetail (opts: ArticleActionOpts) {
  return trackAction('ARTICLE_DETAIL', articleToActionOptions(opts))
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

export function articleAudioStart (opts: ArticleAudioActionOpts) {
  return trackAction('ARTICLE_AUDIO_START', articleAudioToActionOptions(opts))
}

export function articleAudioEnd (opts: ArticleAudioActionOpts) {
  return trackAction('ARTICLE_AUDIO_COMPLETE', articleAudioToActionOptions(opts))
}

export function articleVideoStart (opts: ArticleVideoActionOpts) {
  return trackAction('ARTICLE_VIDEO_START', articleVideoToActionOptions(opts))
}

export function articleVideoEnd (opts: ArticleVideoActionOpts) {
  return trackAction('ARTICLE_VIDEO_COMPLETE', articleVideoToActionOptions(opts))
}

export function searched (opts: SearchActionOpts) {
  return trackAction('SEARCH_EXECUTED', searchToActionOptions(opts))
}

export function setProxy (opts: SetProxyOpts) {
  return trackAction('SET_PROXY', setProxyToActionOptions(opts))
}

export const analyticsHelper = {
  articleDetail,
  favoriteArticle,
  shareArticle,
  articleAudioStart,
  articleAudioEnd,
  articleVideoStart,
  articleVideoEnd,
  searched,
  setProxy,
}

export interface AnalyticsProps {
  analytics: typeof analyticsHelper
}

export interface HOCAnalyticsOptions {
  skip?: boolean
  itemType?: ADB.ItemType
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

const mediaNames: ADB.MediaName[] = [
  'audio',
  'video',
]

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
          page_title: title,
          headline: itemType === 'article' ? title : undefined,
          byline: byline,
          pub_date: pubDate,
          article_uid: `${articleId}`,
          search_keyword: searchKeyword,
          media_type: mediaType,
          media_name: itemType && (itemType in mediaNames) ? itemType as ADB.MediaName : undefined,
          item_type: itemType,
        })
      }
    }
  }
}
