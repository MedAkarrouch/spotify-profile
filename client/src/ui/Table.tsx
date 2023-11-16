import styles from "../styles/Table.module.scss"
import { MdAccessTime } from "react-icons/md"
import { TracksType } from "../utils/Types"

const Table = ({ data }: { data: TracksType[] }) => {
  return (
    <div role="table" className={styles.table}>
      <header role="rowheader" className={styles.header}>
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span>
          <MdAccessTime />
        </span>
      </header>
      <div role="rowgroup" className={styles.rows}>
        {data.map((track, index) => (
          <div className={styles.row} role="row">
            <span className={styles.songNum}>{index + 1}</span>
            <div className={styles.titleBox}>
              <img src={track.image} />
              <div>
                <span className={styles.song}>{track.name}</span>
                <span className={styles.performedBy}>{track.performedBy}</span>
              </div>
            </div>
            <span className={styles.album}>{track.album}</span>
            <span>{`${track.duration.minutes}:${track.duration.seconds}`}</span>
          </div>
        ))}
        {/* <div className={styles.row} role="row">
          <span className={styles.songNum}>1</span>
          <div className={styles.titleBox}>
            <img src="https://i.scdn.co/image/ab67616d00004851164feb363334f93b6458d2a9" />
            <div>
              <span className={styles.song}>Set Fire to the rain</span>
              <span className={styles.performedBy}>Adele</span>
            </div>
          </div>
          <span className={styles.album}>21</span>
          <span>4:02</span>
        </div> */}
        {/* <div className={styles.row} role="row">
          <span className={styles.songNum}>2</span>
          <div className={styles.titleBox}>
            <img src="https://i.scdn.co/image/ab67616d00004851164feb363334f93b6458d2a9" />
            <div>
              <span className={styles.song}>Virginia Beach</span>
              <span className={styles.performedBy}>Drake</span>
            </div>
          </div>
          <span className={styles.album}>For All The Dogs</span>
          <span>4:11</span>
        </div>
        <div className={styles.row} role="row">
          <span className={styles.songNum}>3</span>
          <div className={styles.titleBox}>
            <img src="https://i.scdn.co/image/ab67616d00004851164feb363334f93b6458d2a9" />
            <div>
              <span className={styles.song}>Torjan Horse</span>
              <span className={styles.performedBy}>Dave, Central Cee</span>
            </div>
          </div>
          <span className={styles.album}>Split Decision</span>
          <span>4:08</span>
        </div> */}
      </div>
    </div>
  )
}

export default Table
