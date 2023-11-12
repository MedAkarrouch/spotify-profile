import styles from "./Login.module.scss"
import Button from "../../ui/Button"
import { useLogin } from "./useLogin"
import Logo from "../../components/Logo"
import Loader from "../../components/Loader"

const Login = () => {
  const { login, isLoading } = useLogin()
  return (
    <section className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Logo />
          <h1>Spotify Profile</h1>
          <Button type="login" onClick={login}>
            Login to spotify
          </Button>
        </>
      )}
    </section>
  )
}

export default Login
