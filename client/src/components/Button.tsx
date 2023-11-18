import { ReactNode } from "react"
import { motion } from "framer-motion"
import styles from "../styles/Button.module.scss"
import { Link } from "react-router-dom"
type RegularBtn = {
  onClick?: () => void
  to?: undefined
}
type LinkBtn = {
  to: string
  onClick?: undefined
}
type PropsType = {
  children: ReactNode
  type: string
} & (RegularBtn | LinkBtn)

const Button = ({
  children,
  type,
  to = undefined,
  onClick = undefined
}: PropsType) => {
  if (to)
    return (
      <Link to={to} className={`${styles.link} ${styles[`link--${type}`]}`}>
        {children}
      </Link>
    )
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`${styles.btn} ${styles[`btn--${type}`]}`}
    >
      {children}
    </motion.button>
  )
}

export default Button
