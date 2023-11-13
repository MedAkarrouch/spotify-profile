import { Outlet } from "react-router-dom"
import styles from "./AppLayout.module.scss"
import { useUser } from "../features/auth/useUser"
import { useAuth } from "../features/auth/useAuth"
// import { useCode } from "../features/auth/useCode"
const AppLayout = () => {
  const { isAuthenticated, isLoading } = useUser()
  useAuth(isAuthenticated, isLoading)
  // useCode(refetchUser)
  console.log({ isLoading, isAuthenticated })

  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  )
}

export default AppLayout
