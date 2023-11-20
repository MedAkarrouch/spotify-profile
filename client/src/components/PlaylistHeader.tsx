import styles from "../styles/PlaylistHeader.module.scss"

const PlaylistHeader = ({ playlist }: { playlist: any }) => {
  return (
    <div className={styles.header}>
      <img src={playlist.image} alt={`image of the playlist`} />
      <div>
        <p className={styles.header__playlistType}>
          {playlist.isPublic ? "Public" : "Private"} Playlist
        </p>
        <p className={styles.header__playlistName}>{playlist.name}</p>
        <p className={styles.header__playlistInfo}>
          <span>{playlist.owner}</span>
          <span>&#x2022;</span>
          <span>{playlist.totalSongs} songs</span>
        </p>
      </div>
    </div>
  )
}

export default PlaylistHeader
