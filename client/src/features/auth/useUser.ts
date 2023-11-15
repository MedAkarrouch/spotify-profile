import { useQuery } from "@tanstack/react-query"
import { getMe } from "../../api/spotify"
import { useSearchParams } from "react-router-dom"

export const useUser = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const code = searchParams.get("code")
  if (searchParams.has("error")) {
    const updatedSearchParams = new URLSearchParams(searchParams)
    updatedSearchParams.delete("error")
    setSearchParams(updatedSearchParams)
  }
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getMe(code),
    retry: false
  })

  return { isLoading, user, isAuthenticated: user ? true : false }
}
