import { useMutation } from "@tanstack/react-query"
import { login as loginApi } from "../../api/authApi"

export const useLogin = () => {
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (url: string) => {
      window.location.href = url
    }
  })
  return { login, isLoading }
}
