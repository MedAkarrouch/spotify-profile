import { useInfiniteQuery } from "@tanstack/react-query"
import { getRecentPlayedTracks } from "../api/spotify"
import { spotifyApi } from "../utils/utils"

export const useRecentPlayedTracks = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["recentPlayedTracks"],
      queryFn: ({ pageParam }) => getRecentPlayedTracks(pageParam),
      getNextPageParam: (lastPage) => lastPage.next,
      initialPageParam: `${spotifyApi}/me/player/recently-played`
    })
  return { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage }
}
