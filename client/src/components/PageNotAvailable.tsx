import Button from "../ui/Button"
import styles from "./PageNotAvailable.module.scss"
import spotifyLogo from "../../public/spotify.png"
const PageNotAvailable = () => {
  return (
    <div className={styles.container}>
      <img src={spotifyLogo} alt="spotify logo" />
      <h1>Page not available</h1>
      <p>Something went wrong</p>
      <Button type="pageNotAvailable">Home</Button>
    </div>
  )
}

export default PageNotAvailable
