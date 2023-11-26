import styles from "../styles/Login.module.scss"
import { useLogin } from "../hooks/useLogin"
import Logo from "../icons/Logo"
import { useUser } from "../hooks/useUser"
import { Navigate } from "react-router-dom"
import MiniLoader from "../components/MiniLoader"

const Login = () => {
  const { isAuthenticated, isLoading } = useUser()
  const { login } = useLogin()

  if (isLoading) return <MiniLoader loaderType="full" />

  if (isAuthenticated) return <Navigate replace to="/" />

  return (
    <div className={styles.container}>
      <Logo />
      <h1>Profile Spotify</h1>
      <button onClick={() => login()}>Login to spotify</button>
    </div>
  )
}

export default Login
