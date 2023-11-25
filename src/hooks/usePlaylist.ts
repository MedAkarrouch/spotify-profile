import { useInfiniteQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getPlaylistTracks } from "../api/spotify"
import { PlaylistTracksType, TrackType } from "../utils/Types"
import { getImage, spotifyApi } from "../utils/utils"

const isValidData = (array: any): boolean =>
  Array.isArray(array?.pages) &&
  array.pages.length > 0 &&
  array?.pages.every((page: any) => page !== null)
// array.pages[0] !== null

export const usePlaylist = () => {
  const { playlistId } = useParams()
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["playlist", playlistId],
      queryFn: ({ pageParam }) => getPlaylistTracks(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage) return null
        if (allPages.length < 2) return lastPage.tracks.next
        else return lastPage.next
      },
      initialPageParam: `${spotifyApi}/playlists/${playlistId}`,
      retry: false
    })
  // console.log("Data = ", data)
  let playlist: null | PlaylistTracksType = null
  if (isValidData(data)) {
    const {
      id,
      name,
      images,
      description,
      tracks: { total },
      owner: { display_name: ownerName, images: ownerImages }
    } = data!.pages[0]

    const image = getImage(images, true)
    // Array.isArray(images) && images.length > 0 ? images[0].url : null
    const ownerImg = Array.isArray(ownerImages)
      ? getImage(ownerImages, true)
      : null

    playlist = {
      id,
      owner: { name: ownerName, image: ownerImg },
      description,
      name,
      image,
      songs: total
    }
  }
  const tracksArr = isValidData(data)
    ? data!.pages.reduce((acc, page, index) => {
        if (index === 0) return [...acc, ...page.tracks.items]
        else return [...acc, ...page.items]
      }, [])
    : []

  const tracks: TrackType[] = tracksArr.map((item: any): TrackType => {
    const {
      track: { name, duration_ms, artists, album, id, uri, preview_url }
    } = item
    const performedBy: string = artists
      .map((artist: any) => artist.name)
      .join(", ")
    const duration = {
      minutes: new Date(duration_ms).getMinutes(),
      seconds: new Date(duration_ms).getSeconds()
    }
    const image = getImage(album.images, false)
    return {
      id,
      name,
      duration,
      performedBy,
      album: album.name,
      image,
      uri,
      previewUrl: preview_url || ""
    }
  })
  // console.log("Data = ", data)
  // console.log("Tracks = ", tracks)
  // console.log("Playlist = ", playlist)

  return {
    playlist,
    tracks,
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  }
}
