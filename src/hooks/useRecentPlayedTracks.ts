import { useQuery } from "@tanstack/react-query"
import { getRecentPlayedTracks } from "../api/spotify"
import { getImage } from "../utils/utils"
import { TrackType } from "../utils/Types"

export const useRecentPlayedTracks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["recentPlayedTracks"],
    queryFn: getRecentPlayedTracks
  })
  // console.log("Data = ", data)
  const tracks: TrackType[] = Array.isArray(data?.items)
    ? data.items.map((item: any) => {
        const {
          played_at: platedAt,
          track: {
            name,
            duration_ms,
            artists,
            album,
            id: trackId,
            uri,
            preview_url
          }
        } = item
        const id = `${trackId}-${platedAt}`
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
    : []

  return {
    data,
    tracks,
    isLoading
  }
}
// export const useRecentPlayedTracks = () => {
//   const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
//     useInfiniteQuery({
//       queryKey: ["recentPlayedTracks"],
//       queryFn: ({ pageParam }) => getRecentPlayedTracks(pageParam),
//       getNextPageParam: (lastPage) => lastPage.next,
//       initialPageParam: `${spotifyApi}/me/player/recently-played?limit=50`
//     })
//   console.log(data)
//   const tracks: TrackType[] = data?.pages.reduce((acc, curr) => {
//     const items: TrackType[] = curr.items.map((item: any): TrackType => {
//       const {
//         played_at: platedAt,
//         track: {
//           name,
//           duration_ms,
//           artists,
//           album,
//           id: trackId,
//           uri,
//           preview_url
//         }
//       } = item
//       const id = `${trackId}-${platedAt}`
//       const performedBy: string = artists
//         .map((artist: any) => artist.name)
//         .join(", ")
//       const duration = {
//         minutes: new Date(duration_ms).getMinutes(),
//         seconds: new Date(duration_ms).getSeconds()
//       }
//       const image = getImage(album.images, false)
//       return {
//         id,
//         name,
//         duration,
//         performedBy,
//         album: album.name,
//         image,
//         uri,
//         previewUrl: preview_url || ""
//       }
//     })

//     return [...acc, ...items]
//   }, [])
//   // console.log(tracks)

//   return {
//     data,
//     tracks,
//     isLoading,
//     isFetchingNextPage,
//     hasNextPage,
//     fetchNextPage
//   }
// }
