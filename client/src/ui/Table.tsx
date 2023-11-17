import styles from "../styles/Table.module.scss"
import { MdAccessTime } from "react-icons/md"
import { TracksType } from "../utils/Types"
import { AnimatePresence, motion, stagger } from "framer-motion"
import { useEffect, useRef } from "react"

const Table = ({ data }: { data: TracksType[] }) => {
  const headerRef = useRef<HTMLElement>(null!)
  useEffect(() => {
    const handler = () => {
      if (headerRef.current === null) return
      console.log(
        "scrollY = ",
        window.scrollY,
        " offsetTop = ",
        headerRef.current.offsetTop
      )
      const threshold = 10
      // const isSticky = window.scrollY >= headerRef.current.offsetTop
      const isSticky = window.scrollY + threshold >= headerRef.current.offsetTop
      if (isSticky) headerRef.current.classList.add(styles.isSticky)
      if (!isSticky) headerRef.current.classList.remove(styles.isSticky)

      // console.log("isSticky = ", isSticky)
    }
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])
  return (
    <div role="table" className={styles.table}>
      <header ref={headerRef} role="rowheader" className={styles.header}>
        <span>#</span>
        <span>Title</span>
        <span></span>
        <span>Album</span>
        <span>
          <MdAccessTime />
        </span>
      </header>
      {data.length > 0 && (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          initial="hidden"
          animate="visible"
          role="rowgroup"
          className={styles.rows}
        >
          {data.map((track, index) => (
            <AnimatePresence key={track.id}>
              <motion.div
                layout
                variants={{
                  hidden: { opacity: 0, y: -30 },
                  visible: { opacity: 1, y: 0 }
                }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: "spring" }}
                className={styles.row}
                role="row"
              >
                <p className={styles.songNum}>{index + 1}</p>
                <img src={track.image} />
                <p className={styles.song}>{track.name}</p>
                <p className={styles.performedBy}>{track.performedBy}</p>
                <p className={styles.album}>{track.album}</p>
                <p className={styles.duration}>{`${
                  track.duration.minutes
                }:${track.duration.seconds.toString().padStart(2, "0")}`}</p>
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Table
