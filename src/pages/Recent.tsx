import { useRecentPlayedTracks } from "../hooks/useRecentPlayedTracks"
import Table from "../components/Table"
import MiniLoader from "../components/MiniLoader"
import { useScrollTop } from "../hooks/useScrollTop"
import NoAvailableData from "../components/NoAvailableData"
const Recent = () => {
  useScrollTop()
  const { tracks, isLoading } = useRecentPlayedTracks()

  return (
    <>
      <div className="pageHeader">
        <h1 className="pageHeading">Recently Played Tracks</h1>
      </div>
      {isLoading ? (
        <MiniLoader />
      ) : !tracks?.length ? (
        <NoAvailableData ressourceName="Tracks" />
      ) : (
        <Table onProfile={false} data={tracks} />
      )}
    </>
  )
}

export default Recent
