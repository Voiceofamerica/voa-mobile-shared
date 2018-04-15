
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

export interface AudioArticle {
  id: number
  pubDate?: string | null
  image: ImageSource | null
  audio: MediaSource & {
    audioTitle: string,
  }
}

export const fromAudioArticle = (
  article: AudioArticle | undefined,
  dateSerializer = defaultDateSerializer,
): ListItem => {
  if (article === undefined) {
    return defaultItem
  }

  const { id, pubDate, image, audio } = article

  return {
    id,
    title: audio.audioTitle,
    image: image || undefined,
    minorText: dateSerializer(pubDate),
    icon: 'audio',
  }
}

export const fromAudioArticleList = (
  articles: AudioArticle[] | undefined = [],
  dateSerializer = defaultDateSerializer,
  programType?: ProgramType,
): ListItem[] => (
  articles
    .filter(article => article.audio)
    .map(article => fromAudioArticle(article, dateSerializer))
)

export interface VideoArticle {
  id: number
  pubDate?: string | null
  video: MediaSource & {
    videoTitle: string,
    thumbnailTiny?: string | null,
    thumbnailThumb?: string | null,
    thumbnailHero?: string | null,
  }
}

export const fromVideoArticle = (
  article: VideoArticle | undefined,
  dateSerializer = defaultDateSerializer,
): ListItem => {
  if (article === undefined) {
    return defaultItem
  }

  const { id, pubDate, video } = article

  return {
    id,
    title: video.videoTitle,
    image: {
      tiny: video.thumbnailTiny || undefined,
      thumb: video.thumbnailThumb || undefined,
      hero: video.thumbnailHero || undefined,
    },
    minorText: dateSerializer(pubDate),
    icon: 'video',
  }
}

export const fromVideoList = (
  articles: VideoArticle[] | undefined = [],
  dateSerializer = defaultDateSerializer,
  programType?: ProgramType,
): ListItem[] => (
  articles
    .filter(article => article.video)
    .map(article => fromVideoArticle(article, dateSerializer))
)

export interface PhotoGalleryArticle {
  id: number
  title: string
  pubDate?: string | null
  image: ImageSource | null
  photoGallery: PhotoGallery[] | null
}

export const fromPhotoGalleryArticle = (
  article: PhotoGalleryArticle | undefined,
  dateSerializer = defaultDateSerializer,
): ListItem => {
  if (article === undefined) {
    return defaultItem
  }

  const { id, title, pubDate, image } = article

  return {
    id,
    title,
    image,
    minorText: dateSerializer(pubDate),
    icon: 'photoGallery',
  }
}

export const fromPhotoGalleryArticleList = (
  articles: PhotoGalleryArticle[] | undefined = [],
  dateSerializer = defaultDateSerializer,
  programType?: ProgramType,
): ListItem[] => (
  articles
    .filter(article => article.photoGallery)
    .map(article => fromPhotoGalleryArticle(article, dateSerializer))
)
