import { useInfiniteQuery } from "@tanstack/react-query"
import { getPlaylists } from "../api/spotify"
import { PlaylistType } from "../utils/Types"
import { getImage, spotifyApi } from "../utils/utils"
const isValidData = (array: any): boolean => {
  return (
    Array.isArray(array?.pages) &&
    array.pages.length > 0 &&
    array.pages.every((p: any) => p !== null)
    // array.pages[0] !== null
  )
}
export const usePlaylists = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["playlists"],
      queryFn: ({ pageParam }) => getPlaylists(pageParam),
      getNextPageParam: (lastPage) => lastPage?.next || null,
      initialPageParam: `${spotifyApi}/me/playlists?limit=20`,
      retry: false
    })

  const items = isValidData(data)
    ? data!.pages.reduce((acc, p) => [...acc, ...p.items], [])
    : []

  const playlists: PlaylistType[] = items.map((item: any) => {
    const { name, tracks, images, id } = item
    const image = getImage(images, true)
    return { id, name, totalTracks: tracks.total, image }
  })
  console.log("Data = ", data)
  console.log("Playlists = ", playlists)

  return {
    data,
    playlists,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    fetchNextPage
  }
}
