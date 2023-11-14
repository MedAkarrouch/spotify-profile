import { Outlet, Navigate } from "react-router-dom"
import styles from "../styles/AppLayout.module.scss"
import { useUser } from "../features/auth/useUser"
import Loader from "./Loader"
import Navbar from "./Navbar"
// import { useCode } from "../features/auth/useCode"
const AppLayout = () => {
  const { isAuthenticated, isLoading } = useUser()
  console.log({ isAuthenticated, isLoading })
  if (isLoading) return <Loader />
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
// const AppLayout = () => {
//   const { isAuthenticated, isLoading } = useUser()
//   const location = useLocation()
//   console.log({ isAuthenticated, isLoading })
//   if (location.pathname !== "/login" && !isAuthenticated && !isLoading)
//     return <Navigate replace to="/login" />
//   if (location.pathname === "/login" && isAuthenticated && !isLoading)
//     return <Navigate replace to="/" />
//   if (isLoading) return <Loader />
//   return (
//     <main className={styles.main}>
//       <Navbar />
//       <Outlet />
//     </main>
//   )
// }

export default AppLayout
