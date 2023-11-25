import PlaylistsList from "../components/PlaylistsList"
import { useScrollTop } from "../hooks/useScrollTop"

const Playlists = () => {
  useScrollTop()
  return (
    <>
      <div className="pageHeader">
        <h1>Playlists</h1>
      </div>
      <PlaylistsList />
    </>
  )
}

export default Playlists
