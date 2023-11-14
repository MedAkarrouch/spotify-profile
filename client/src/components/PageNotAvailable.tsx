import Button from "../ui/Button"
import Logo from "./Logo"
import styles from "../styles/PageNotAvailable.module.scss"
const PageNotAvailable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo />
        <h1>Page not available</h1>
        <p>Something went wrong, please try again later.</p>
        <Button to="/" type="pageNotAvailable">
          Home
        </Button>
      </div>
    </div>
  )
}

export default PageNotAvailable
