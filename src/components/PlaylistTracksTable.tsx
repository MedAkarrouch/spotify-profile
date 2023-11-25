import styles from "../styles/Table.module.scss"
import { MdAccessTime, MdOutlinePause, MdPlayArrow } from "react-icons/md"
import { TrackType } from "../utils/Types"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState, useReducer, RefObject } from "react"
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

type AudioStateType = {
  isPlaying: boolean
  clickedRow: string | null
  currentTime: number
  audioElement: RefObject<HTMLAudioElement>
}

type PlayPausedTrack = {
  type: "PLAYPAUSEDTRACK"
}
type PlayNewTrackAction = {
  type: "PLAYNEWTRACK"
  payload: {
    track: string
    previewUrl: string
  }
}
type PauseTrackAction = {
  type: "PAUSETRACK"
}
type UpdateTimeAction = {
  type: "UPDATETIME"
}
type EndTrackAction = {
  type: "ENDTRACK"
}

type ReducerActionType =
  | UpdateTimeAction
  | EndTrackAction
  | PauseTrackAction
  | PlayNewTrackAction
  | PlayPausedTrack

const reducer = (
  state: AudioStateType,
  action: ReducerActionType
): AudioStateType => {
  switch (action.type) {
    case "PLAYPAUSEDTRACK": {
      state.audioElement.current?.play()
      return { ...state, isPlaying: true }
    }
    case "PLAYNEWTRACK": {
      if (state.audioElement.current && action.payload.previewUrl) {
        state.audioElement.current.src = action.payload.previewUrl
        state.audioElement.current.load()
        state.audioElement.current.play()
        return {
          ...state,
          isPlaying: true,
          currentTime: 0,
          clickedRow: action.payload.track
        }
      } else {
        return {
          ...state
        }
      }
    }
    case "PAUSETRACK": {
      state.audioElement?.current?.pause()
      return { ...state, isPlaying: false }
    }
    case "ENDTRACK":
      return { ...state, currentTime: 0, isPlaying: false, clickedRow: null }
    case "UPDATETIME": {
      const newTime =
        (Math.round(state.audioElement.current?.currentTime || 0) / 30) * 100
      return { ...state, currentTime: newTime }
    }
    default:
      return state
  }
}

const Table = ({
  data,
  hasNextPage,
  isFetchingNextPage,
  fetchFn
}: PropsType) => {
  const headerRef = useRef<HTMLElement>(null!)
  const lastItemRef = useRef<HTMLDivElement>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [state, dispatch] = useReducer(reducer, {
    isPlaying: false,
    clickedRow: null,
    currentTime: 0,
    audioElement: audioRef
  })
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

  const handleTimeUpdate = () => dispatch({ type: "UPDATETIME" })
  const handleOnEnd = () => dispatch({ type: "ENDTRACK" })
  const handleOnClick = (id: string, previewUrl: string) => {
    if (state.clickedRow === id && state.isPlaying)
      return dispatch({
        type: "PAUSETRACK"
      })
    if (state.clickedRow === id && !state.isPlaying)
      return dispatch({
        type: "PLAYPAUSEDTRACK"
      })
    if (state.clickedRow !== id)
      return dispatch({
        type: "PLAYNEWTRACK",
        payload: {
          track: id,
          previewUrl
        }
      })
  }
  const handleMouseOver = (id: string) => setHoveredRow(id)
  const handleMouseOut = () => setHoveredRow(null)

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
          <audio
            style={{ display: "none" }}
            ref={audioRef}
            src={""}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleOnEnd}
          />
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
                className={`${styles.row}  ${
                  track.id === state.clickedRow ? styles["row--clicked"] : ""
                }`}
                role="row"
                ref={index === data.length - 1 ? lastItemRef : undefined}
                onMouseOver={() => handleMouseOver(track.id)}
                onMouseOut={handleMouseOut}
                onClick={() => handleOnClick(track.id, track.previewUrl)}
              >
                <div className={styles.songNum}>
                  {state.clickedRow === track.id ? (
                    <div
                      className={styles.circle}
                      style={{
                        backgroundImage: `conic-gradient(#fff ${state.currentTime}%, transparent 0)`
                      }}
                    >
                      <div className={styles.inner}>
                        {state.isPlaying ? <MdOutlinePause /> : <MdPlayArrow />}
                      </div>
                    </div>
                  ) : hoveredRow === track.id ? (
                    <MdPlayArrow />
                  ) : (
                    index + 1
                  )}
                </div>
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
