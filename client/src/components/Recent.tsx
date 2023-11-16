import { getRecentPlayedTracks } from "../api/spotify"
import { useRecentPlayedTracks } from "../hooks/useRecentPlayedTracks"
import Table from "../ui/Table"
const Recent = () => {
  const { tracks, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    useRecentPlayedTracks()

  // console.log({ data, isLoading, isFetchingNextPage, hasNextPage })

  return (
    <>
      <h1 className="pageHeading">Recently Played Tracks</h1>
      <Table data={tracks?.length ? tracks : []} />
      <button
        onClick={() => {
          if (hasNextPage && !isLoading && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
      >
        Get
      </button>
    </>
  )
}

export default Recent
