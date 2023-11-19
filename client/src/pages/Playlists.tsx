import ArtistsPlaylistsList from "../components/ArtistsPlaylistsList"
import PlaylistItems from "../components/PlaylistItems"
import { usePlaylists } from "../hooks/usePlaylists"
import { useScrollTop } from "../hooks/useScrollTop"

const Playlists = () => {
  const { isLoading, data, playlists } = usePlaylists()
  console.log(isLoading, data, playlists)
  useScrollTop()
  return (
    <>
      <div className="pageHeader">
        <h1>Playlists</h1>
      </div>
      <ArtistsPlaylistsList
        isLoading={isLoading}
        data={playlists}
        dataType="playlists"
      />
    </>
  )
}

export default Playlists
