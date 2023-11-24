import styles from "../styles/NoAvailableData.module.scss"

const NoAvailableData = ({
  ressourceName = "Data"
}: {
  ressourceName: string
}) => {
  return (
    <div className={styles.message}>
      Oops! No {ressourceName} available at the moment. Please check back later.
    </div>
  )
}

export default NoAvailableData
