import MiniLoader from "../components/MiniLoader"
import PlaylistHeader from "../components/PlaylistHeader"
import Table from "../components/Table"
import { usePlaylist } from "../hooks/usePlaylist"

const Playlist = () => {
  const { isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, data } =
    usePlaylist()
  console.log({ isLoading, isFetchingNextPage, hasNextPage, data })
  if (isLoading) return <MiniLoader />
  return (
    <div>
      {/* Playlist */}
      {/* <PlaylistHeader playlist={playlist} /> */}
      <button
        onClick={() => {
          if (!isFetchingNextPage && !isLoading && hasNextPage) {
            fetchNextPage()
          }
        }}
      >
        Get More
      </button>
      {/* <Table data={tracks} /> */}
    </div>
  )
}

export default Playlist
