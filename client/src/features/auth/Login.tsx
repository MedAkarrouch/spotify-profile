import { motion } from "framer-motion"
import styles from "../../styles/Login.module.scss"
import { useLogin } from "./useLogin"
import Logo from "../../components/Logo"
import { useUser } from "./useUser"
import Loader from "../../components/Loader"
import { Navigate } from "react-router-dom"

const Login = () => {
  const { isAuthenticated, isLoading: isLoading1 } = useUser()
  const { login, isLoading: isLoading2 } = useLogin()
  const isLoading = isLoading1 || isLoading2
  if (isLoading1) return <Loader />
  if (isAuthenticated) return <Navigate replace to="/" />

  return (
    <div className={styles.container}>
      <Logo />
      <h1>Spotify Profile</h1>
      <motion.button onClick={() => login()}>
        {isLoading ? "Loading..." : "Login to spotify"}
      </motion.button>
    </div>
  )
}

export default Login
