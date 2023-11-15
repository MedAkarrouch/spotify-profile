import { useQuery } from "@tanstack/react-query"
import { getFollowedArtists } from "../api/spotify"
export const useFollowedArtist = () => {
  const { isLoading, data: artists } = useQuery({
    queryKey: ["followedArtists"],
    queryFn: getFollowedArtists
  })
  return { isLoading, artists }
}
