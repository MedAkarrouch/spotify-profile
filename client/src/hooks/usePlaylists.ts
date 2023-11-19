import { useQuery } from "@tanstack/react-query"
import { getPlaylists } from "../api/spotify"
import { PlaylistType } from "../utils/Types"
export const usePlaylists = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
    retry: false
  })
  const playlists: PlaylistType[] =
    data?.items.map((item: any) => {
      const { name, tracks, images, id } = item
      const image = images.length > 0 ? images[0].url : null
      return { id, name, totalTracks: tracks.total, image }
    }) || []
  return { isLoading, data, playlists }
}
