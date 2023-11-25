import IconTracks from "../icons/IconTracks"
import styles from "../styles/PlaylistHeader.module.scss"
import { PlaylistTracksType } from "../utils/Types"

const PlaylistHeader = ({ playlist }: { playlist: PlaylistTracksType }) => {
  const { image, name, description, owner, songs } = playlist

  return (
    <div className={styles.header}>
      {image ? (
        <img
          className={styles.header__img}
          src={image}
          alt={`image of the playlist ${name}`}
        />
      ) : (
        <div className={styles.header__imgContainer}>
          <IconTracks />
        </div>
      )}
      <div className={styles.header__infoContainer}>
        <p className={styles.header__playlistType}>Playlist</p>
        <p className={styles.header__playlistName}>{name}</p>
        {description && (
          <p className={styles.header__description}>{description}</p>
        )}
        <p className={styles.header__playlistInfo}>
          {owner.image && (
            <img className={styles.header__ownerImg} src={owner.image} />
          )}
          {owner.name && (
            <>
              <span className={styles.header__owner}>{owner.name}</span>
              <span className={styles.header__point}>&#x2022;</span>
            </>
          )}
          <span className={styles.header__songs}>{songs} songs</span>
        </p>
      </div>
    </div>
  )
}

export default PlaylistHeader
