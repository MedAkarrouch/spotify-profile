import { useEffect } from "react"
import { getRecentPlayedTracks } from "../api/spotify"
import { useRecentPlayedTracks } from "../hooks/useRecentPlayedTracks"
import Table from "../components/Table"
import MiniLoader from "../components/MiniLoader"
const Recent = () => {
  const { tracks, isLoading } = useRecentPlayedTracks()

  console.log({ isLoading, tracks })

  return (
    <>
      <h1 className="pageHeading">Recently Played Tracks</h1>
      {isLoading ? <MiniLoader /> : <Table data={tracks} />}
    </>
  )
}

export default Recent
