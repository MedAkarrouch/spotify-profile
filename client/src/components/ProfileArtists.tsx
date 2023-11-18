import { useRef, useEffect, useState } from "react"
import { useArtists } from "../hooks/useArtists"
import styles from "../styles/ProfileArtists.module.scss"
import { ArtistType } from "../utils/Types"

const ProfileArtists = () => {
  const listRef = useRef<HTMLUListElement>(null)
  const { isLoading, artists } = useArtists()
  console.log("//", { isLoading, artists })

  if (isLoading) return "loading..."
  return (
    <>
      {/* <div>{width}</div> */}
      <div>{listRef.current?.clientWidth}</div>
      <ul ref={listRef} className={styles.list}>
        {artists.map((artist: ArtistType) => (
          <li key={artist.id}>
            <a target="_blank" href={artist.uri}>
              <div className={styles.imageContainer}>
                <img
                  src={artist.image}
                  // src="https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9"
                  alt="image of "
                />
              </div>
              <p className={styles.name}>{artist.name}</p>
              <p className={styles.type}>{artist.type}</p>
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ProfileArtists
