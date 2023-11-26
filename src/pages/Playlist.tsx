import { Navigate } from "react-router-dom"
import MiniLoader from "../components/MiniLoader"
import PlaylistHeader from "../components/PlaylistHeader"
import { usePlaylist } from "../hooks/usePlaylist"
import GoBackBtn from "../components/GoBackBtn"
import PlaylistTracksTable from "../components/PlaylistTracksTable"
import { useScrollTop } from "../hooks/useScrollTop"
import NoAvailableData from "../components/NoAvailableData"

const Playlist = () => {
  useScrollTop()
  // const navigate = useNavigate()
  const {
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    playlist,
    tracks
  } = usePlaylist()

  if (isLoading) return <MiniLoader loaderType="main" />
  if (!playlist) return <Navigate to="/pageNotFound" />

  return (
    <div>
      {/* Playlist */}
      <GoBackBtn />
      <PlaylistHeader playlist={playlist} />
      {!tracks?.length ? (
        <NoAvailableData ressourceName="Tracks" />
      ) : (
        <PlaylistTracksTable
          data={tracks}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchFn={fetchNextPage}
        />
      )}
    </div>
  )
}

export default Playlist
