import { useUser } from "../features/auth/useUser"
import { useFollowedArtist } from "../hooks/useFollowedArtists"

const ProfileHeader = () => {
  const { user } = useUser()
  const { display_name: username } = user
  const { isLoading, artists } = useFollowedArtist()
  return (
    <header>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {/* <img src={} alt={`Profile image of ${username}`} /> */}
          <h1>{username}</h1>
          <div>{artists.total}</div>
        </>
      )}
    </header>
  )
}

export default ProfileHeader
