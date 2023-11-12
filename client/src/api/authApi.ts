import axios from "axios"
import { config, api, spotifyApi, getSpotifyApiConfig } from "../utils/utils"
type callbackFnParams = {
  code: string
  state: string
  error: string
}
export const login = async (): Promise<string> => {
  const res = await axios.get(`${api}/auth/login`, config)
  const url = res.data.url
  return url
}
export const callback = async ({
  code,
  state,
  error
}: callbackFnParams): Promise<void> =>
  await axios.get(
    `${api}/auth/callback?code=${code}&state=${state}&error${error}`,
    config
  )

export const getToken = async ({
  code,
  state,
  error
}: callbackFnParams): Promise<void> =>
  await axios.get(
    `${api}/auth/callback?code${code}&state=${state}&error${error}`,
    config
  )
type getMePropsType = {
  token: string
}
export const getMe = async ({ token }: getMePropsType) => {
  try {
    const res = await axios.get(`${spotifyApi}/me`, getSpotifyApiConfig(token))
    return res.data
  } catch (err) {}
}
