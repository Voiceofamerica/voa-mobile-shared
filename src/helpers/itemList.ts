
import * as moment from 'moment'

export interface ImageSource {
  tiny?: string
  thumb?: string
  hero?: string
}

export interface MediaSource {
  url?: string
}

export interface Photo {
  id?: number | null
}

export interface PhotoGallery {
  photo?: Photo[] | null
}

export interface ListItem {
  id: number
  title: string
  minorText?: string
  image?: ImageSource | null
  icon?: IconType
}

const defaultItem: ListItem = {
  id: -1,
  title: '',
}

export interface DateSerializer {
  (date?: string | null): string | undefined
}

const defaultDateSerializer: DateSerializer =
  (date) => (date && moment(date).format('lll')) || undefined

export interface Article {
  id: number
  title: string
  pubDate?: string | null
  image: ImageSource | null
  video?: MediaSource | null
  audio?: MediaSource | null
  photoGallery?: PhotoGallery[] | null
}

export const getIconName = (video, audio, photoGallery): IconType | undefined => {
  if (video) {
    return 'video'
  } else if (audio) {
    return 'audio'
  } else if (photoGallery) {
    return 'photoGallery'
  } else {
    return undefined
  }
}

export const fromArticle = (
  article: Article | undefined,
  dateSerializer = defaultDateSerializer,
): ListItem => {
  if (article === undefined) {
    return defaultItem
  }

  const { id, title, pubDate, image, video, audio, photoGallery } = article
  const hasPhotoGallery = Boolean(photoGallery && photoGallery.some(gallery => {
    return Boolean(gallery.photo && gallery.photo.length > 0)
  }))

  const icon = getIconName(
    Boolean(video && video.url),
    Boolean(audio && audio.url),
    hasPhotoGallery,
  )

  return {
    id,
    title,
    image: image || undefined,
    minorText: dateSerializer(pubDate),
    icon,
  }
}

export const fromArticleList = (
  articles: Article[] | undefined = [],
  dateSerializer = defaultDateSerializer,
): ListItem[] => (
  articles.map(article => fromArticle(article, dateSerializer))
)

export type ProgramType = 'video' | 'audio' | 'photoGallery'
export type IconType = 'video' | 'audio' | 'photoGallery'

export interface Program {
  id: number
  programTitle: string
  date?: string | null
  image: ImageSource | null
  type?: ProgramType
}

export const fromProgram = (
  program: Program | undefined,
  dateSerializer = defaultDateSerializer,
  programType: ProgramType | undefined = program && program.type,
): ListItem => {
  if (program === undefined) {
    return defaultItem
  }

  const { id, programTitle, date, image } = program

  return {
    id,
    title: programTitle,
    image: image || undefined,
    minorText: dateSerializer(date),
    icon: programType,
  }
}

export const fromProgramList = (
  programs: Program[] | undefined = [],
  dateSerializer = defaultDateSerializer,
  programType?: ProgramType,
): ListItem[] => (
  programs.map(program => fromProgram(program, dateSerializer, programType))
)
