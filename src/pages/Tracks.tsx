import { useSearchParams } from "react-router-dom"
import FilterBy from "../components/FilterBy"
import Table from "../components/Table"
import { useTracks } from "../hooks/useTracks"
import MiniLoader from "../components/MiniLoader"
import { useScrollTop } from "../hooks/useScrollTop"
import NoAvailableData from "../components/NoAvailableData"

const Tracks = () => {
  const [searchParams] = useSearchParams()
  const filterBy = searchParams.get("filterBy") || ""
  const { isLoading, tracks } = useTracks()
  console.log({ isLoading, tracks })
  useScrollTop()
  return (
    <>
      <div className="pageHeader">
        <h1>Top Tracks</h1>
        <FilterBy />
      </div>
      {isLoading ? (
        <MiniLoader />
      ) : !tracks?.length ? (
        <NoAvailableData ressourceName="Tracks" />
      ) : (
        <Table onProfile={false} key={filterBy} data={tracks} />
      )}
    </>
  )
}

export default Tracks
