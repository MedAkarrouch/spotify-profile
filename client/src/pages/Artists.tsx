import ArtistsPlaylistsList from "../components/ArtistsPlaylistsList"
import FilterBy from "../components/FilterBy"
import ProfileArtists from "../components/ProfileArtists"
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

      {/* <ProfileArtists /> */}
      <ArtistsPlaylistsList
        onProfile={false}
        data={artists}
        isLoading={isLoading}
        dataType="artists"
      />
    </>
  )
}

export default Artists
