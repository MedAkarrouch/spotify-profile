import FilterBy from "../components/FilterBy"
import ProfileArtists from "../components/ProfileArtists"

const Artists = () => {
  return (
    <>
      <div className="pageHeader">
        <h1>Top Artists</h1>
        <FilterBy />
      </div>

      <ProfileArtists />
    </>
  )
}

export default Artists
