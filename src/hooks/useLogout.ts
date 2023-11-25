import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logout as logoutApi } from "../api/spotify"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isPending: isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSettled: async () => {
      await queryClient.removeQueries()
      navigate("/login")
    }
  })
  return { isLoading, logout }
}
