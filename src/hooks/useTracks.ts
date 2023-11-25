import { useQuery } from "@tanstack/react-query"
import { getTop } from "../api/spotify"
import { TrackType } from "../utils/Types"
import { useSearchParams } from "react-router-dom"
import { filters, getImage } from "../utils/utils"

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
      const { name, uri, id, duration_ms, artists, album, preview_url } = item
      const duration = {
        minutes: new Date(duration_ms).getMinutes(),
        seconds: new Date(duration_ms).getSeconds()
      }
      const image = getImage(album.images, false)
      const performedBy = artists.map((artist: any) => artist.name).join(", ")
      return {
        id,
        name,
        duration,
        image,
        uri,
        performedBy,
        album: album.name,
        previewUrl: preview_url || ""
      }
    }) || []
  return { isLoading, tracks }
}
