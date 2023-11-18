import { useEffect } from "react"
import { getRecentPlayedTracks } from "../api/spotify"
import { useRecentPlayedTracks } from "../hooks/useRecentPlayedTracks"
import Table from "../components/Table"
const Recent = () => {
  // const { tracks, isLoading } = useRecentPlayedTracks()
  const { tracks, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
    useRecentPlayedTracks()

  console.log({ isLoading, tracks })
  // useEffect(() => {
  //   // Add an event listener to the window's scroll event
  //   window.addEventListener("scroll", handler)

  //   // Function to check if the user has scrolled to the bottom of the page
  //   function handler() {
  //     var scrollTop = window.scrollY || document.documentElement.scrollTop
  //     var totalHeight = document.documentElement.scrollHeight
  //     var viewportHeight =
  //       window.innerHeight || document.documentElement.clientHeight
  //     const reachedBottom = scrollTop + viewportHeight >= totalHeight
  //     if (reachedBottom && hasNextPage && !isLoading && !isFetchingNextPage) {
  //       fetchNextPage()
  //     }
  //   }
  //   return () => window.removeEventListener("scroll", handler)
  // }, [hasNextPage, isLoading, isFetchingNextPage])

  return (
    <>
      <h1 className="pageHeading">Recently Played Tracks</h1>
      <Table data={tracks?.length ? tracks : []} />
    </>
  )
}

export default Recent
