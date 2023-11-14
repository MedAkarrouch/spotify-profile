import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "../../api/authApi"
import { useSearchParams } from "react-router-dom"

export const useUser = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  console.log(code)
  const {
    isLoading,
    data: user,
    refetch: refetchUser
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getMe(code),
    retry: false
  })
  useEffect(() => {
    refetchUser()
  }, [code])

  return { isLoading, user, isAuthenticated: user ? true : false }
}
