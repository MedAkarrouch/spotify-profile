import { useUser } from "../hooks/useUser"
import styles from "../styles/ProfileHeader.module.scss"
// import { useFollowedArtist } from "../hooks/useFollowedArtists"

const ProfileHeader = () => {
  const { user } = useUser()
  const { display_name: username } = user
  // const { isLoading, artists } = useFollowedArtist()
  console.log(user)
  return (
    <header className={styles.header}>
      <img
        className={styles.img}
        src={user.images[1].url}
        alt={`Profile image of ${username}`}
      />
      <h1>{username}</h1>
      <div>
        <div className={styles.infoContainer}>
          <div className={styles.box}>
            <span className={styles.number}>0</span>
            <span className={styles.label}>Followers</span>
          </div>
          <div className={styles.box}>
            <span className={styles.number}>20</span>
            <span className={styles.label}>Following</span>
          </div>
          <div className={styles.box}>
            <span className={styles.number}>37</span>
            <span className={styles.label}>Playlists</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader
