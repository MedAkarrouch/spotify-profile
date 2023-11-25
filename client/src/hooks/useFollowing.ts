import { useQuery } from "@tanstack/react-query"
import { getFollowing } from "../api/spotify"

export const useFollowing = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["following"],
    queryFn: getFollowing
  })
  const following = data?.total || 0
  return { isLoading, following }
}
