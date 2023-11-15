import styles from "../styles/Navbar.module.scss"
import Logo from "./Logo"
import { MdPerson } from "react-icons/md"
import { MdOutlineClearAll } from "react-icons/md"
import { MdHistory } from "react-icons/md"
import NavLinkLine from "./NavLinkLine"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Logo />
      </div>
      <ul className={styles.navlist}>
        <li>
          <NavLinkLine to="/profile" lineStyles={styles.line}>
            <MdPerson />
            <span>Profile</span>
          </NavLinkLine>
        </li>
        <li>
          <NavLinkLine to="/library" lineStyles={styles.line}>
            <MdOutlineClearAll />
            <span>Library</span>
          </NavLinkLine>
        </li>
        <li>
          <NavLinkLine to="/recent" lineStyles={styles.line}>
            <MdHistory />
            <span>Recent</span>
          </NavLinkLine>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
