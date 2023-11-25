import styles from "../styles/Profile.module.scss"
import ProfileHeader from "../components/ProfileHeader"
import { useScrollTop } from "../hooks/useScrollTop"
import ArtistsList from "../components/ArtistsList"
import { Link } from "react-router-dom"
import { useArtists } from "../hooks/useArtists"
import Table from "../components/Table"
import { useTracks } from "../hooks/useTracks"
import { useFollowing } from "../hooks/useFollowing"
import { usePlaylists } from "../hooks/usePlaylists"
import MiniLoader from "../components/MiniLoader"

const Profile = () => {
  useScrollTop()
  const { isLoading: isLoadingFollowing, following } = useFollowing()
  const { isLoading: isLoadingPlaylists, totalPlaylists } = usePlaylists()
  const { isLoading: isLoadingArtists, artists } = useArtists()
  const { isLoading: isLoadingTracks, tracks } = useTracks()
  const isLoading =
    isLoadingArtists ||
    isLoadingTracks ||
    isLoadingFollowing ||
    isLoadingPlaylists

  if (isLoading) return <MiniLoader loaderType="main" />

  return (
    <>
      <ProfileHeader following={following} totalPlaylists={totalPlaylists} />
      <div className={styles.container}>
        {artists?.length > 0 && (
          <div>
            <div className={styles.header}>
              <h2>Top artists this month</h2>
              <Link to="/artists">Show all</Link>
            </div>
            <ArtistsList onProfile={true} data={artists} />
          </div>
        )}

        {tracks?.length > 0 && (
          <div>
            <div className={styles.header}>
              <h2>Top tracks this month</h2>
              <Link to="/tracks">Show all</Link>
            </div>
            <Table onProfile={true} data={tracks} />
          </div>
        )}
      </div>
    </>
  )
}

export default Profile
