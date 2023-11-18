import { useQuery } from "@tanstack/react-query"
import { getArtists } from "../api/spotify"
import { ArtistType } from "../utils/Types"

export const useArtists = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
    retry: false
  })
  const artists: ArtistType[] =
    data?.items.map((item: any) => {
      const { type, name, images, uri, id } = item
      const image = images[0].url
      return { id, type, name, image, uri }
    }) || []
  return { isLoading, data, artists }
}
