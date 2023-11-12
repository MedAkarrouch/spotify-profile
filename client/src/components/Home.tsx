import Login from "../features/auth/Login"
import Profile from "./Profile"

const Home = () => {
  const isLoggedIn = false
  if (isLoggedIn) return <Profile />
  if (!isLoggedIn) return <Login />
}

export default Home
