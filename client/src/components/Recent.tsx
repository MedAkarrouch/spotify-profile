import { getRecentPlayedTracks } from "../api/spotify"
import { useRecentPlayedTracks } from "../hooks/useRecentPlayedTracks"
const Recent = () => {
  const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    useRecentPlayedTracks()

  console.log({ data, isLoading, isFetchingNextPage, hasNextPage })

  return (
    <div>
      <button
        onClick={() => {
          if (hasNextPage && !isLoading && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
      >
        Get
      </button>
    </div>
  )
}

export default Recent
