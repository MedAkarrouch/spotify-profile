import styles from "../styles/Table.module.scss"
import { MdAccessTime } from "react-icons/md"
import { TrackType } from "../utils/Types"
import { AnimatePresence, motion, stagger } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useObserver } from "../hooks/useObserver"
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from "@tanstack/react-query"
import MiniLoader from "./MiniLoader"
import IconTracks from "../icons/IconTracks"
type PropsType = {
  data: TrackType[]
  isFetchingNextPage: boolean
  hasNextPage: boolean
  fetchFn: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>>
}
const Table = ({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchFn
}: PropsType) => {
  const headerRef = useRef<HTMLElement>(null!)
  const lastItemRef = useRef<HTMLDivElement>(null)
  // Sticky
  useEffect(() => {
    const handler = () => {
      if (headerRef.current === null) return

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
  // Last Element/
  useEffect(() => {
    const observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchFn()
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1
      }
    )
    if (lastItemRef.current) observer.observe(lastItemRef.current)
    return () => observer.disconnect()
  }, [isFetchingNextPage, hasNextPage, fetchFn])

  if (!data.length) return null
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
                ref={index === data.length - 1 ? lastItemRef : undefined}
              >
                <p className={styles.songNum}>{index + 1}</p>
                {track.image ? (
                  <img src={track.image} />
                ) : (
                  <div className={styles.imgContainer}>
                    <IconTracks />
                  </div>
                )}
                <p className={styles.song}>{track.name}</p>
                <p className={styles.performedBy}>{track.performedBy}</p>
                <p className={styles.album}>{track.album}</p>
                <p className={styles.duration}>{`${
                  track.duration.minutes
                }:${track.duration.seconds.toString().padStart(2, "0")}`}</p>
                <a target="_blank" href={track.uri}></a>
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      )}
      {isFetchingNextPage && <MiniLoader loaderType={"tracks"} />}
    </div>
  )
}

export default Table
