import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

export const useCode = (handler: () => void) => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  useEffect(() => {
    handler()
  }, [code])
}
