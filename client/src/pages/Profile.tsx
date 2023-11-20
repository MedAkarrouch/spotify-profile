import { usePlaylists } from "../hooks/usePlaylists"
import ProfileHeader from "../components/ProfileHeader"
import ProfileMain from "../components/ProfileMain"
import { useScrollTop } from "../hooks/useScrollTop"

const Profile = () => {
  useScrollTop()
  return (
    <>
      <ProfileHeader />
      {/* <ProfileMain /> */}
    </>
  )
}

export default Profile
