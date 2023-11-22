import { useEffect } from "react"
import { getRecentPlayedTracks } from "../api/spotify"
import { useRecentPlayedTracks } from "../hooks/useRecentPlayedTracks"
import Table from "../components/Table"
import MiniLoader from "../components/MiniLoader"
import { useScrollTop } from "../hooks/useScrollTop"
import AudioPlayer from "../components/AudioPlayer"
const Recent = () => {
  const { tracks, isLoading } = useRecentPlayedTracks()
  useScrollTop()
  console.log({ isLoading, tracks })

  return (
    <>
      <div className="pageHeader">
        <h1 className="pageHeading">Recently Played Tracks</h1>
        <AudioPlayer />
      </div>
      {isLoading ? <MiniLoader /> : <Table data={tracks} />}
    </>
  )
}

export default Recent
