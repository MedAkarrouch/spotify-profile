import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router-dom"
import { getPlaylistTracks } from "../api/spotify"
import { TrackType } from "../utils/Types"
import { spotifyApi } from "../utils/utils"

// export const usePlaylist = () => {
//   const { playlistId } = useParams()
//   // const page = `https://api.spotify.com/v1/playlists/${playlistId}`
//   const page =
//     "https://api.spotify.com/v1/playlists/5YBOnFZco0qKZMLM0B1lSV/tracks?offset=100&limit=100&locale=en-US,en;q=0.9"
//   const { isLoading, data } = useQuery({
//     queryKey: ["playlist", playlistId],
//     queryFn: () => getPlaylistTracks(page)
//   })
//   let playlist = {}
//   // if (data) {
//   //   const {
//   //     id,
//   //     name,
//   //     images,
//   //     tracks: { total: totalSongs },
//   //     public: isPublic,
//   //     owner: { display_name: owner },
//   //     followers: { total: totalFollowers }
//   //   } = data
//   //   const image = images.length > 0 ? images[0].url : null
//   //   playlist = {
//   //     id,
//   //     owner,
//   //     name,
//   //     image,
//   //     totalSongs,
//   //     isPublic,
//   //     totalFollowers
//   //   }
//   // }
//   // const tracks: TrackType[] =
//   //   data?.tracks.items.map((item: any) => {
//   //     const {
//   //       track: { name, duration_ms, artists, album, id, uri }
//   //     } = item
//   //     const performedBy: string = artists
//   //       .map((artist: any) => artist.name)
//   //       .join(", ")
//   //     const duration = {
//   //       minutes: new Date(duration_ms).getMinutes(),
//   //       seconds: new Date(duration_ms).getSeconds()
//   //     }
//   //     const images = album.images
//   //     const image =
//   //       images.length === 3
//   //         ? images[2].url
//   //         : images.length === 2
//   //         ? images[1]
//   //         : images[0]
//   //     return { id, name, duration, performedBy, album: album.name, image, uri }
//   //   }) || []
//   return { isLoading, data, tracks: [], playlist }
// }
const isValidPlaylist = (array: any): boolean => {
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
  const tracksArr = isValidPlaylist(data)
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
  console.log("Tracks = ", tracks)

  return {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  }
}
