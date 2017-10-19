enum ZoneType {
  Audio = 1 << 0,
  Video = 1 << 1,
  PhotoGallery = 1 << 2
}

export interface IZone {
  id: number
  site: number
  /** Date and time of last zone content modification **/
  hash: Date
  /** If zone is article zone or zone for gallery or video (values are a,v,p or its combinations) **/
  type: ZoneType
  /** If zone is Broadcast zone **/
  broadcast: boolean
  name: string
}