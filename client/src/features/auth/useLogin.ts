import { useMutation } from "@tanstack/react-query"
import { getAuthLink } from "../../api/spotify"

export const useLogin = () => {
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: getAuthLink,
    onSuccess: (url: string) => {
      window.location.href = url
    }
  })
  return { login, isLoading }
}
