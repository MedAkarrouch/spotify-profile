import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { setTokens } from "../../api/authApi"
export const useToken = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  const navigate = useNavigate()
  const { mutate: auth } = useMutation({
    // mutationFn: () => setTokens(code)
    // onError : ()=>
  })
}
