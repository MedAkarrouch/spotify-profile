export const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true
}
export const api = import.meta.env.VITE_API
export const scope = import.meta.env.VITE_SCOPE
export const clientId = import.meta.env.VITE_CLIENT_ID
export const spotifyApi = import.meta.env.VITE_SPOTIFY_API
export const redirectURI = import.meta.env.VITE_REDIRECT_URI
export const getSpotifyApiConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
}

export const generateCodeVerifier = (length: number): string => {
  let text = ""
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const generateCodeChallenge = async (
  codeVerifier: string
): Promise<string> => {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await window.crypto.subtle.digest("SHA-256", data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}
