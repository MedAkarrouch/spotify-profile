import { useQuery } from "@tanstack/react-query"
import { getTop } from "../api/spotify"
import { ArtistType } from "../utils/Types"
import { useSearchParams } from "react-router-dom"
import { filters } from "../utils/utils"

export const useArtists = () => {
  const [searchParams] = useSearchParams()
  let filterBy = searchParams.get("filterBy") || ""
  filterBy = filters.map((el) => el.value).includes(filterBy)
    ? filterBy
    : filters[0].value

  const { isLoading, data } = useQuery({
    queryKey: ["artists", filterBy],
    queryFn: () => getTop("artists", filterBy),
    retry: false
  })
  const artists: ArtistType[] = Array.isArray(data?.items)
    ? data.items.map((item: any) => {
        const { type, name, images, uri, id } = item
        const image =
          Array.isArray(images) && images.length > 0 ? images[0].url : null
        return { id, type, name, image, uri }
      })
    : []
  return { isLoading, data, artists }
}
