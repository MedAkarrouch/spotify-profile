import styles from "../styles/ArtistsPlaylistsList.module.scss"
import { PlaylistType } from "../utils/Types"
import { motion } from "framer-motion"
import MiniLoader from "./MiniLoader"
import IconTracks from "../icons/IconTracks"
import { Link } from "react-router-dom"
import { usePlaylists } from "../hooks/usePlaylists"
import { useEffect, useRef } from "react"
import NoAvailableData from "./NoAvailableData"

const PlaylistsList = () => {
  const {
    playlists,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = usePlaylists()
  const lastItemRef = useRef<HTMLLIElement>(null)
  // Listen on last item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && hasNextPage && !isFetchingNextPage)
          fetchNextPage()
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1
      }
    )
    if (lastItemRef.current) observer.observe(lastItemRef.current)
    return () => observer.disconnect()
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])

  if (isLoading) return <MiniLoader />
  if (!playlists?.length) return <NoAvailableData ressourceName="Playlists" />
  return (
    <ul className={`${styles.list} ${styles.listPlaylists}`}>
      {playlists.map((playlist: PlaylistType, index: number) => (
        <motion.li
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
          key={playlist.id}
          className={styles.playlistItem}
          ref={index === playlists.length - 1 ? lastItemRef : undefined}
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
      {isFetchingNextPage && (
        <div style={{ gridColumn: "1/-1" }}>
          {<MiniLoader loaderType={"tracks"} />}
        </div>
      )}
    </ul>
  )
}

export default PlaylistsList
