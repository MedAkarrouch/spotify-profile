import { useRef, useState } from "react"
import { MdOutlinePlayArrow } from "react-icons/md"
import { MdOutlinePause } from "react-icons/md"
import styles from "../styles/AudioPlayer.module.scss"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const previewUrl =
    "https://p.scdn.co/mp3-preview/cd30d69492cf560a098fd76378ed240c8f14985d?cid=2ad0f4cbf0bc45f9ae3d632e30070eb0"
  const handleTimeUpdate = () => console.log(audioRef.current?.currentTime)
  const handleClick = () => setIsPlaying((isPlaying) => !isPlaying)
  return (
    <div className={styles.container}>
      <button onClick={handleClick}>
        {/* {isPlaying ? <MdOutlinePause /> : <MdOutlinePlayArrow />} */}
        <span>
          <div></div>
          {/* <MdOutlinePause /> */}
        </span>
      </button>
      <audio ref={audioRef} src={previewUrl} onTimeUpdate={handleTimeUpdate} />
    </div>
  )
}

export default AudioPlayer
