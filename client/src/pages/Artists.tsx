import ArtistsPlaylistsList from "../components/ArtistsList"
import FilterBy from "../components/FilterBy"
import MiniLoader from "../components/MiniLoader"
import NoAvailableData from "../components/NoAvailableData"
import { useArtists } from "../hooks/useArtists"
import { useScrollTop } from "../hooks/useScrollTop"

const Artists = () => {
  const { isLoading, artists } = useArtists()
  useScrollTop()
  return (
    <>
      <div className="pageHeader">
        <h1>Top Artists</h1>
        <FilterBy />
      </div>
      {isLoading ? (
        <MiniLoader />
      ) : !artists?.length ? (
        <NoAvailableData ressourceName="Artists" />
      ) : (
        <ArtistsPlaylistsList onProfile={false} data={artists} />
      )}
    </>
  )
}

export default Artists
