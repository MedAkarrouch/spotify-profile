import { useArtists } from "../hooks/useArtists"
import ArtistsPlaylistsList from "./ArtistsPlaylistsList"
import ProfileArtists from "./ProfileArtists"
import { Link } from "react-router-dom"

const ProfileMain = () => {
  const { isLoading, artists } = useArtists()
  return (
    <>
      <div>
        <h2>Top artists this month</h2>
        <Link to="/artists">Show all</Link>
      </div>

      <ArtistsPlaylistsList
        onProfile={true}
        isLoading={isLoading}
        data={artists}
        dataType="artists"
      />
      {/* <ProfileArtists /> */}
    </>
  )
}

export default ProfileMain
