import styles from "../styles/Profile.module.scss"
import ProfileHeader from "../components/ProfileHeader"
import { useScrollTop } from "../hooks/useScrollTop"
import ArtistsPlaylistsList from "../components/ArtistsPlaylistsList"
import { Link } from "react-router-dom"
import { useArtists } from "../hooks/useArtists"
import Table from "../components/Table"
import { useTracks } from "../hooks/useTracks"

const Profile = () => {
  const { isLoading: isLoadingArtists, artists } = useArtists()
  const { isLoading: isLoadingTracks, tracks } = useTracks()
  useScrollTop()
  return (
    <>
      <ProfileHeader />
      <div className={styles.header}>
        <h2>Top artists this month</h2>
        <Link to="/artists">Show all</Link>
      </div>

      <ArtistsPlaylistsList
        onProfile={true}
        isLoading={isLoadingArtists}
        data={artists}
        dataType="artists"
      />
      <div className={styles.header}>
        <h2>Top tracks this month</h2>
        <Link to="/tracks">Show all</Link>
      </div>
      <Table onProfile={true} data={tracks} />
    </>
  )
}

export default Profile
