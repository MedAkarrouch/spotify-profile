import { ReactNode } from "react"
import styles from "./Button.module.scss"
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
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[`btn--${type}`]}`}
    >
      {children}
    </button>
  )
}

export default Button
