import { NavLink, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { ReactNode } from "react"

type PropsType = {
  children: ReactNode
  to: string
  lineStyles: string
}

const NavLinkLine = ({ to, children, lineStyles }: PropsType) => {
  const location = useLocation()

  return (
    <NavLink to={to}>
      {children}
      {location.pathname === to && (
        <motion.div layoutId="line" className={lineStyles}></motion.div>
      )}
    </NavLink>
  )
}

export default NavLinkLine
