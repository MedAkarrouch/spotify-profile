import Login from "../features/auth/Login"
import Profile from "./Profile"

const Home = () => {
  const isLoggedIn = true
  if (isLoggedIn) return <Profile />
  if (!isLoggedIn) return <Login />
}

export default Home
