// const AudioPlayer = () => {
//   // const bar = new ProgressBar.Circle
//   const audioRef = useRef<HTMLAudioElement>(null)
//   //   const [isPlaying, setIsPlaying] = useState(false)
//   return (
//     <div className={styles.circle}>
//       <div className={styles.inner}></div>
//     </div>
//   )
// }

import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react"
import { MdOutlinePause } from "react-icons/md"
import { MdPlayArrow } from "react-icons/md"
import styles from "../styles/AudioPlayer.module.scss"

type PropsType = {
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

const AudioPlayer = ({ isPlaying, setIsPlaying }: PropsType) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  // const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const previewUrl =
    "https://p.scdn.co/mp3-preview/cd30d69492cf560a098fd76378ed240c8f14985d?cid=2ad0f4cbf0bc45f9ae3d632e30070eb0"
  const handleTimeUpdate = () => {
    console.log(audioRef.current?.currentTime)
    setCurrentTime((Math.round(audioRef.current!.currentTime) / 30) * 100)
  }
  const resetTime = () => setCurrentTime(0)
  const handleClick = () => {
    if (isPlaying) audioRef.current?.pause()
    if (!isPlaying) audioRef.current?.play()
    setIsPlaying((isPlaying) => !isPlaying)
  }
  const handleOnEnd = () => {
    setIsPlaying(false)
    resetTime()
  }
  return (
    <div className={styles.container}>
      <button onClick={handleClick}>
        {!isPlaying && (
          <span>
            <MdPlayArrow />
          </span>
        )}
        {isPlaying && (
          <div
            className={styles.circle}
            style={{
              backgroundImage: `conic-gradient(#fff ${currentTime}%, transparent 0)`
            }}
          >
            <div className={styles.inner}>
              <MdOutlinePause />
            </div>
          </div>
        )}
      </button>
      <audio
        ref={audioRef}
        src={previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleOnEnd}
      />
    </div>
  )
}

export default AudioPlayer
