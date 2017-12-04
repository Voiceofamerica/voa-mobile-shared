
interface Image {
  url: string
}

export default interface ArticleBlurb {
  id: number
  image: Image | null
  title: string
  pubDate: string
}
