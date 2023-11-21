import { MdKeyboardBackspace } from "react-icons/md"
import styles from "../styles/GoBackBtn.module.scss"

import { useNavigate } from "react-router-dom"
const GoBackBtn = () => {
  const navigate = useNavigate()
  return (
    <button className={styles.button} onClick={() => navigate(-1)}>
      <MdKeyboardBackspace />
      <span>Back</span>
    </button>
  )
}

export default GoBackBtn
