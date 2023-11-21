import { useInfiniteQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getPlaylistTracks } from "../api/spotify"
import { PlaylistTracksType, TrackType } from "../utils/Types"
import { getImage, spotifyApi } from "../utils/utils"

const isValidData = (array: any): boolean => {
  return (
    array?.pages &&
    array.pages.length &&
    array.pages.length > 0 &&
    array.pages[0] !== null
  )
}
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
  // if (data?.pages?.length! > 0) {
  //   const {
  //     id,
  //     name,
  //     images,
  //     tracks: { total: totalSongs },
  //     public: isPublic,
  //     owner: { display_name: owner },
  //     followers: { total: totalFollowers }
  //   } = data.pages[0]
  //   const image = images.length > 0 ? images[0].url : null
  //   playlist = {
  //     id,
  //     owner,
  //     name,
  //     image,
  //     totalSongs,
  //     isPublic,
  //     totalFollowers
  //   }
  // }
  // console.log(tracks)
  console.log("Data = ", data)
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

    const image = images.length > 0 ? images[0].url : null

    playlist = {
      id,
      owner: { name: ownerName, image: getImage(ownerImages, false) },
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
      track: { name, duration_ms, artists, album, id, uri }
    } = item
    const performedBy: string = artists
      .map((artist: any) => artist.name)
      .join(", ")
    const duration = {
      minutes: new Date(duration_ms).getMinutes(),
      seconds: new Date(duration_ms).getSeconds()
    }
    const images = album.images
    const image =
      images.length === 3
        ? images[2].url
        : images.length === 2
        ? images[1].url
        : images[0].url
    return { id, name, duration, performedBy, album: album.name, image, uri }
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
