import styles from "./Login.module.scss"
import Button from "../../ui/Button"
import { useLogin } from "./useLogin"

const Login = () => {
  const { login, isLoading } = useLogin()
  return (
    <section className={styles.container}>
      <h1>Spotify Profile</h1>
      <Button type="login" onClick={login}>
        {isLoading ? "Loading..." : "Login to spotify"}
      </Button>
    </section>
  )
}

export default Login
