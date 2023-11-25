import { useSearchParams } from "react-router-dom"
import styles from "../styles/FilterBy.module.scss"
import { filters } from "../utils/utils"
import { motion } from "framer-motion"

const FilterBy = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  let filterBy = searchParams.get("filterBy") || ""
  filterBy = filters.map((el) => el.value).includes(filterBy)
    ? filterBy
    : filters[0].value
  return (
    <div className={styles.container}>
      {filters.map((filter) => {
        return (
          <button
            key={filter.label}
            className={
              filterBy === filter.value
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
            onClick={() => {
              searchParams.set("filterBy", filter.value)
              setSearchParams(searchParams)
            }}
          >
            {filter.label}
            {filterBy === filter.value && (
              <motion.div
                layoutId="btn-line"
                className={styles.line}
              ></motion.div>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default FilterBy
