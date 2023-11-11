import { useMutation } from "@tanstack/react-query"
import { callback as callbackApi } from "../../api/authApi"
export const useCallback = () => {
  const { isPending: isLoading, mutate: callback } = useMutation({
    mutationFn: callbackApi,
    onSuccess: () => {}
  })

  return { isLoading, callback }
}
