import styles from "../styles/ArtistsPlaylistsList.module.scss"
import { ArtistType } from "../utils/Types"
import { motion } from "framer-motion"

type PropsType = {
  data: ArtistType[]
  onProfile: boolean
}

const ArtistsList = ({ data, onProfile }: PropsType) => {
  if (!data?.length) return null
  return (
    <ul className={`${styles.list} ${onProfile && styles.onProfile}`}>
      {data.map((artist: ArtistType) => (
        <motion.li
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
          key={artist.id}
        >
          <a target="_blank" href={artist.uri}></a>
          <div className={styles.imageContainer}>
            {artist.image ? (
              <img src={artist.image} alt={`image of ${artist.name}`} />
            ) : (
              <div className={styles.noImg}></div>
            )}
          </div>
          <p className={styles.name}>{artist.name}</p>
          <p className={styles.type}>{artist.type}</p>
        </motion.li>
      ))}
    </ul>
  )
}

export default ArtistsList
