
import * as moment from 'moment'

export interface MediaSource {
  tiny?: string
  thumb?: string
  hero?: string
}

export interface ListItem {
  id: number
  title: string
  minorText?: string
  image?: MediaSource
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
  image: MediaSource | null
}

export const fromArticle = (
  article: Article,
  dateSerializer = defaultDateSerializer,
): ListItem => {
  const { id, title, pubDate, image } = article
  return {
    id,
    title,
    image: image || undefined,
    minorText: dateSerializer(pubDate),
  }
}

export const fromArticleList = (
  articles: Article[],
  dateSerializer = defaultDateSerializer,
): ListItem[] => (
  articles.map(article => fromArticle(article, dateSerializer))
)

export interface Program {
  id: number
  programTitle: string
  date?: string | null
  image: MediaSource | null
}

export const fromProgram = (
  program: Program,
  dateSerializer = defaultDateSerializer,
) => {
  const { id, programTitle, date, image } = program
  return {
    id,
    title: programTitle,
    image: image || undefined,
    minorText: dateSerializer(date),
  }
}

export const fromProgramList = (
  programs: Program[],
  dateSerializer = defaultDateSerializer,
): ListItem[] => (
  programs.map(program => fromProgram(program, dateSerializer))
)
