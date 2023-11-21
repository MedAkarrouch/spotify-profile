import { useNavigate } from "react-router-dom"
import MiniLoader from "../components/MiniLoader"
import PlaylistHeader from "../components/PlaylistHeader"
import Table from "../components/Table"
import { usePlaylist } from "../hooks/usePlaylist"
import GoBackBtn from "../components/GoBackBtn"
import Loader from "../components/Loader"
import PlaylistTracksTable from "../components/PlaylistTracksTable"
const Playlist = () => {
  const navigate = useNavigate()
  const {
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    playlist,
    tracks
  } = usePlaylist()
  console.log({
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    data,
    playlist,
    tracks
  })

  if (isLoading) return <MiniLoader loaderType="main" />
  if (!playlist) navigate("/pageNotFound", { replace: true })

  return (
    <div>
      {/* Playlist */}
      <GoBackBtn />
      <PlaylistHeader playlist={playlist!} />
      <PlaylistTracksTable
        data={tracks}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchFn={fetchNextPage}
      />
    </div>
  )
}

export default Playlist
