import axios from "axios"
import Cookies from "js-cookie"
import {
  scope,
  clientId,
  spotifyApi,
  generateCodeChallenge,
  generateCodeVerifier,
  getSpotifyApiConfig,
  redirectURI,
  api
} from "../utils/utils"

export const getAuthLink = async (): Promise<string> => {
  const verifier = generateCodeVerifier(128)
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem("verifier", verifier)

  const params = new URLSearchParams()
  params.append("client_id", clientId)
  params.append("response_type", "code")
  params.append("redirect_uri", redirectURI)
  params.append("scope", scope)
  params.append("code_challenge_method", "S256")
  params.append("code_challenge", challenge)

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}
export const setTokens = async (code: string): Promise<void> => {
  const verifier = localStorage.getItem("verifier")
  if (!verifier) throw new Error("Verifier not found")

  localStorage.removeItem("verifier")

  const params = new URLSearchParams()
  params.append("client_id", clientId)
  params.append("grant_type", "authorization_code")
  params.append("code", code)
  params.append("redirect_uri", redirectURI)
  params.append("code_verifier", verifier)
  const result = await axios.post(
    "https://accounts.spotify.com/api/token",
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  )
  const { access_token, refresh_token, expires_in } = result.data
  const expirationDate = new Date(Date.now() + expires_in * 1000)
  Cookies.set("accessToken", access_token, {
    expires: expirationDate
  })
  Cookies.set("refreshToken", refresh_token, {
    expires: expirationDate
  })
}

export const getMe = async (code: string | null) => {
  // if (!code || !accessToken) return null
  // let token = accessToken
  try {
    // code exists
    if (code) await setTokens(code)
    // access token exists
    const token = getAccessToken()
    if (token) {
      const res = await axios.get(
        `${spotifyApi}/me`,
        getSpotifyApiConfig(token)
      )
      return res.data
    }
    return null
  } catch {
    return null
  }
}
const getToken = (token: string): string | null => {
  const tokenVal = Cookies.get(token)
  if (!tokenVal || typeof tokenVal !== "string") return null
  else return tokenVal
}
export const getAccessToken = () => getToken("accessToken")
export const getRefreshToken = () => getToken("refreshToken")

//Profile
export const getFollowedArtists = async () => {
  const token = getAccessToken()
  if (!token) return null
  try {
    const res = await axios.get(
      `${spotifyApi}/me/following?type=artist`,
      getSpotifyApiConfig(token)
    )
    return res.data.artists
  } catch {
    return null
  }
}

// Recent Played tracks
export const getRecentPlayedTracks = async (pageUrl: string) => {
  const token = getAccessToken()
  if (!token) return null

  try {
    const res = await axios.get(pageUrl, getSpotifyApiConfig(token))
    // console.log("Res = ", res)
    return res.data
  } catch {
    return null
  }
}