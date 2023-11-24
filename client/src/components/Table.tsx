import styles from "../styles/Table.module.scss"
import { MdAccessTime } from "react-icons/md"
import { TrackType } from "../utils/Types"
import { AnimatePresence, motion, stagger } from "framer-motion"
import { RefObject, useEffect, useReducer, useRef, useState } from "react"
import { MdPlayArrow, MdOutlinePause } from "react-icons/md"

type PropsType = {
  data: TrackType[]
  onProfile: boolean
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

const Table = ({ data, onProfile }: PropsType) => {
  const headerRef = useRef<HTMLElement>(null!)
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
  //
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

  const tracks = onProfile ? data.slice(0, 5) : data

  return (
    <div role="table" className={styles.table}>
      {!onProfile && (
        <header ref={headerRef} role="rowheader" className={styles.header}>
          <span>#</span>
          <span>Title</span>
          <span></span>
          <span>Album</span>
          <span>
            <MdAccessTime />
          </span>
        </header>
      )}
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
        {tracks.map((track, index) => (
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
              onMouseOver={() => handleMouseOver(track.id)}
              onMouseOut={handleMouseOut}
              onClick={() => handleOnClick(track.id, track.previewUrl || "")}
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
    </div>
  )
}
// ****************************************************************
// const handleTimeUpdate = () => {
//   setCurrentTime((Math.round(audioRef.current!.currentTime) / 30) * 100)
// }
// const handleOnEnd = () => {
//   setIsPlaying(false)
//   setClickedRow(null)
//   setCurrentTime(0)
//   // setPreviewUrl(undefined)
// }
// const hadnleOnClick = (id: string, previewUrl: string) => {
//   if (!audioRef.current) return
//   setClickedRow(id)
//   // setPreviewUrl(previewUrl)
//   if (id !== clickedRow) {
//     audioRef.current.currentTime = 0
//     setCurrentTime(0)
//     setIsPlaying(true)
//     audioRef.current.src = previewUrl
//     audioRef.current.load()
//     audioRef.current.play()
//     return
//   }
//   // setClickedRow(id)
//   if (isPlaying) audioRef.current.pause()
//   if (!isPlaying) {
//     if (audioRef.current.paused) {
//       audioRef.current.play()
//       audioRef.current.play
//       setIsPlaying((isPlaying) => !isPlaying)
//       return
//     }
//     audioRef.current.src = previewUrl
//     audioRef.current.load()
//     audioRef.current.play()
//   }
//   setIsPlaying((isPlaying) => !isPlaying)
// }
// ****************************************************************

// const Table = ({ data }: { data: TrackType[] }) => {
//   const headerRef = useRef<HTMLElement>(null!)
//   useEffect(() => {
//     const handler = () => {
//       if (headerRef.current === null) return

//       const threshold = 10
//       // const isSticky = window.scrollY >= headerRef.current.offsetTop
//       const isSticky = window.scrollY + threshold >= headerRef.current.offsetTop
//       if (isSticky) headerRef.current.classList.add(styles.isSticky)
//       if (!isSticky) headerRef.current.classList.remove(styles.isSticky)

//       // console.log("isSticky = ", isSticky)
//     }
//     window.addEventListener("scroll", handler)
//     return () => window.removeEventListener("scroll", handler)
//   }, [])
//   return (
//     <div role="table" className={styles.table}>
//       <header ref={headerRef} role="rowheader" className={styles.header}>
//         <span>#</span>
//         <span>Title</span>
//         <span></span>
//         <span>Album</span>
//         <span>
//           <MdAccessTime />
//         </span>
//       </header>
//       {data.length > 0 && (
//         <motion.div
//           variants={{
//             hidden: { opacity: 0 },
//             visible: { opacity: 1 }
//           }}
//           initial="hidden"
//           animate="visible"
//           role="rowgroup"
//           className={styles.rows}
//         >
//           {data.map((track, index) => (
//             <AnimatePresence key={track.id}>
//               <motion.div
//                 layout
//                 variants={{
//                   hidden: { opacity: 0, y: -30 },
//                   visible: { opacity: 1, y: 0 }
//                 }}
//                 exit={{ opacity: 0, y: 30 }}
//                 transition={{ type: "spring" }}
//                 className={styles.row}
//                 role="row"
//               >
//                 <p className={styles.songNum}>{index + 1}</p>
//                 <img src={track.image} />
//                 <p className={styles.song}>{track.name}</p>
//                 <p className={styles.performedBy}>{track.performedBy}</p>
//                 <p className={styles.album}>{track.album}</p>
//                 <p className={styles.duration}>{`${
//                   track.duration.minutes
//                 }:${track.duration.seconds.toString().padStart(2, "0")}`}</p>
//                 <a target="_blank" href={track.uri}></a>
//               </motion.div>
//             </AnimatePresence>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   )
// }

export default Table
