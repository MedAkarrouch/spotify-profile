import { Outlet } from "react-router-dom"
import styles from "./AppLayout.module.scss"
const AppLayout = () => {
  return (
    <main className={styles.container}>
      <Outlet />
    </main>
  )
}

export default AppLayout
