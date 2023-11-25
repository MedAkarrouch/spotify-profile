import { useUser } from "../hooks/useUser"
import IconUser from "../icons/IconUser"
import styles from "../styles/ProfileHeader.module.scss"
type PropsType = {
  following: number
  totalPlaylists: number
}

const ProfileHeader = ({ following, totalPlaylists }: PropsType) => {
  const { user } = useUser()
  const { display_name: username, followers, images } = user

  return (
    <header className={styles.header}>
      {Array.isArray(images) && images.length > 0 ? (
        <img
          className={styles.img}
          src={images[1].url}
          alt={`Profile image of ${username}`}
        />
      ) : (
        <div className={styles.imgContainer}>
          <IconUser />
        </div>
      )}
      <h1>{username}</h1>
      <div>
        <div className={styles.infoContainer}>
          <div className={styles.box}>
            <span className={styles.number}>{followers.total || 0}</span>
            <span className={styles.label}>Followers</span>
          </div>
          <div className={styles.box}>
            <span className={styles.number}>{following}</span>
            <span className={styles.label}>Following</span>
          </div>
          <div className={styles.box}>
            <span className={styles.number}>{totalPlaylists}</span>
            <span className={styles.label}>Playlists</span>
          </div>
        </div>
      </div>
      <button className={styles.btn}>Log out</button>
    </header>
  )
}

export default ProfileHeader
