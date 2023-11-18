import { usePlaylists } from "../hooks/usePlaylists"

const Playlists = () => {
  const { isLoading, data } = usePlaylists()
  console.log(isLoading, data)
  return (
    <>
      <h1>Playlists</h1>
    </>
  )
}

export default Playlists
