import styles from "../styles/Navbar.module.scss"
import Logo from "../icons/Logo"
import NavLinkLine from "./NavLinkLine"
import IconUser from "../icons/IconUser"
import IconArtists from "../icons/IconArtists"
import IconTracks from "../icons/IconTracks"
import IconPlaylist from "../icons/IconPlaylist"
import IconRecent from "../icons/IconRecent"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Logo />
      </div>
      <ul className={styles.navlist}>
        <li>
          <NavLinkLine to="/profile" lineStyles={styles.line}>
            <IconUser />
            <span>Profile</span>
          </NavLinkLine>
        </li>
        <li>
          <NavLinkLine to="/artists" lineStyles={styles.line}>
            <IconArtists />
            <span>Top Artists</span>
          </NavLinkLine>
        </li>
        <li>
          <NavLinkLine to="/tracks" lineStyles={styles.line}>
            <IconTracks />
            <span>Top Tracks</span>
          </NavLinkLine>
        </li>
        <li>
          <NavLinkLine to="/playlists" lineStyles={styles.line}>
            <IconPlaylist />
            <span>Playlists</span>
          </NavLinkLine>
        </li>
        <li>
          <NavLinkLine to="/recent" lineStyles={styles.line}>
            <IconRecent />
            <span>Recent</span>
          </NavLinkLine>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
