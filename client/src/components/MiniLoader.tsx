import styles from "../styles/MiniLoader.module.scss"

const MiniLoader = ({ loaderType = "regular" }: { loaderType?: string }) => {
  return (
    <div
      className={`${styles.container} ${styles[`container--${loaderType}`]}`}
    >
      <div
        className={`${styles.loader} ${styles[`loader--${loaderType}`]}`}
      ></div>
    </div>
  )
}

export default MiniLoader
