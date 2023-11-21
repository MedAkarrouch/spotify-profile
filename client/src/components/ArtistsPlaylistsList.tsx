import styles from "../styles/ArtistsPlaylistsList.module.scss"
import { ArtistType, PlaylistType } from "../utils/Types"
import { motion } from "framer-motion"
import MiniLoader from "./MiniLoader"
import IconTracks from "../icons/IconTracks"
import { Link } from "react-router-dom"

type ArtistData = {
  data: ArtistType[]
  dataType: "artists"
}
type PlaylistData = {
  data: PlaylistType[]
  dataType: "playlists"
}
type PropsType = {
  isLoading: boolean
} & (ArtistData | PlaylistData)

const ArtistsPlaylistsList = ({ isLoading, data, dataType }: PropsType) => {
  if (isLoading) return <MiniLoader />
  if (dataType === "artists")
    return (
      <ul className={styles.list}>
        {data.map((artist: ArtistType) => (
          <motion.li
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
            key={artist.id}
          >
            <a target="_blank" href={artist.uri}></a>
            <div className={styles.imageContainer}>
              <img src={artist.image} alt={`image of ${artist.name}`} />
            </div>
            <p className={styles.name}>{artist.name}</p>
            <p className={styles.type}>{artist.type}</p>
          </motion.li>
        ))}
      </ul>
    )
  if (dataType === "playlists")
    return (
      <ul className={`${styles.list} ${styles.listPlaylists}`}>
        {data.map((playlist: PlaylistType) => (
          <motion.li
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
            key={playlist.id}
            className={styles.playlistItem}
          >
            <Link to={playlist.id}></Link>
            {playlist.image ? (
              <img
                src={playlist.image}
                alt={`image of playlist ${playlist.name}`}
              />
            ) : (
              <div>
                <IconTracks />
              </div>
            )}
            <p className={styles.name}>{playlist.name}</p>
            <p className={styles.type}>{playlist.totalTracks} Tracks</p>
          </motion.li>
        ))}
      </ul>
    )
}

export default ArtistsPlaylistsList
