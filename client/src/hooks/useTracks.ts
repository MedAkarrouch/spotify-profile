import { useQuery } from "@tanstack/react-query"
import { getTop } from "../api/spotify"
import { TrackType } from "../utils/Types"
import { useSearchParams } from "react-router-dom"
import { filters } from "../utils/utils"

export const useTracks = () => {
  const [searchParams] = useSearchParams()
  let filterBy = searchParams.get("filterBy") || ""
  filterBy = filters.map((el) => el.value).includes(filterBy)
    ? filterBy
    : filters[0].value

  const { isLoading, data } = useQuery({
    queryKey: ["tracks", filterBy],
    queryFn: () => getTop("tracks", filterBy),
    retry: false
  })
  // console.log("data = ", data)
  const tracks: TrackType[] =
    data?.items.map((item: any) => {
      const { name, uri, id, duration_ms, artists, album } = item
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
      const performedBy = artists.map((artist: any) => artist.name).join(", ")
      return { id, name, duration, image, uri, performedBy, album: album.name }
    }) || []
  return { isLoading, tracks }
}
