import { useArtists } from "../hooks/useArtists"
import styles from "../styles/ArtistsPlaylistsList.module.scss"
import { ArtistType } from "../utils/Types"
import { motion } from "framer-motion"
import MiniLoader from "./MiniLoader"

const ProfileArtists = () => {
  const { isLoading, artists } = useArtists()
  console.log("//", { isLoading, artists })

  if (isLoading) return <MiniLoader />
  return (
    <>
      <ul className={styles.list}>
        {artists.map((artist: ArtistType) => (
          <motion.li
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
            key={artist.id}
          >
            <a target="_blank" href={artist.uri}>
              <div className={styles.imageContainer}>
                <img src={artist.image} alt="image of " />
              </div>
              <p className={styles.name}>{artist.name}</p>
              <p className={styles.type}>{artist.type}</p>
            </a>
          </motion.li>
        ))}
      </ul>
    </>
  )
}

export default ProfileArtists
