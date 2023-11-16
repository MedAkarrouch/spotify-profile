import { useInfiniteQuery } from "@tanstack/react-query"
import { getRecentPlayedTracks } from "../api/spotify"
import { spotifyApi } from "../utils/utils"
import { TracksType } from "../utils/Types"

export const useRecentPlayedTracks = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["recentPlayedTracks"],
      queryFn: ({ pageParam }) => getRecentPlayedTracks(pageParam),
      getNextPageParam: (lastPage) => lastPage.next,
      initialPageParam: `${spotifyApi}/me/player/recently-played?limit=10`
    })
  // console.log(data)
  const tracks: TracksType[] = data?.pages.reduce((acc, curr) => {
    const items: TracksType[] = curr.items.map((item: any): TracksType => {
      const {
        track: { name, duration_ms, artists, album }
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
          ? images[1]
          : images[0]
      return { name, duration, performedBy, album: album.name, image }
    })

    return [...acc, ...items]
  }, [])
  console.log(tracks)

  return {
    data,
    tracks,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  }
}
