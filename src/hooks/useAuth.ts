import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const useAuth = (isAuthenticated: boolean, isLoading: boolean) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login", { replace: true })
  }, [isAuthenticated, isLoading])
}
