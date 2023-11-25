import { Outlet, Navigate } from "react-router-dom"
import styles from "../styles/AppLayout.module.scss"
import { useUser } from "../hooks/useUser"
import Navbar from "./Navbar"
import MiniLoader from "./MiniLoader"

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useUser()
  console.log({ isAuthenticated, isLoading })
  if (isLoading) return <MiniLoader loaderType="full" />
  if (!isAuthenticated) return <Navigate replace to="/login" />
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
