import { Outlet, Navigate, useNavigate } from "react-router-dom"
import styles from "../styles/AppLayout.module.scss"
import { useUser } from "../hooks/useUser"
import Navbar from "./Navbar"
import MiniLoader from "./MiniLoader"
import { useEffect } from "react"

const AppLayout = () => {
  // const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useUser()
  // console.log({ isAuthenticated, isLoading })
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) navigate("/login")
  // }, [isAuthenticated])

  if (isLoading) return <MiniLoader loaderType="full" />
  // if (!isAuthenticated) return null
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
