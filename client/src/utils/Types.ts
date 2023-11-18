export type TrackType = {
  id: string
  name: string
  image: string
  album: string
  performedBy: string
  duration: { minutes: number; seconds: number }
  uri: string
}
export type ArtistType = {
  id: string
  name: string
  type: string
  image: string
  uri: string
}
