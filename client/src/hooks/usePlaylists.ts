import { useQuery } from "@tanstack/react-query"
import { getPlaylists } from "../api/spotify"
export const usePlaylists = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
    retry: false
  })
  return { isLoading, data }
}
