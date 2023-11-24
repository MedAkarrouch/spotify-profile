export type TrackType = {
  id: string
  name: string
  image: string | null
  album: string
  performedBy: string
  duration: { minutes: number; seconds: number }
  uri: string
  previewUrl: string
}

export type ArtistType = {
  id: string
  name: string
  type: string
  image: string
  uri: string
}
export type PlaylistType = {
  id: string
  name: string
  totalTracks: number
  image: string | null
}

export type PlaylistTracksType = {
  id: string
  image: string | null
  name: string | null
  description: string | null
  owner: { name: string; image: string | null }
  songs: number
}
export type UserImageType = {
  url: string
  width: number | null
  height: number | null
}
