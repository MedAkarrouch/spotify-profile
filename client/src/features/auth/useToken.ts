import { useMutation } from "@tanstack/react-query"
import { callback as callbackApi } from "../../api/authApi"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
export const useToken = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code") || ""
  const state = searchParams.get("state") || ""
  const error = searchParams.get("error") || ""
  const navigate = useNavigate()
  const { mutate: auth } = useMutation({
    mutationFn: () => callbackApi({ state, code, error }),
    onSettled: () => navigate("/", { replace: true })
  })

  useEffect(() => {
    auth()
  }, [])
}
