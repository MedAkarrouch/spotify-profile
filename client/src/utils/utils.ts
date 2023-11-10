import SpotifyWebApi from "spotify-web-api-node"

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-top-read",
  "user-read-activity",
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "user-library-modify",
  "user-follow-read",
  "user-follow-modify"
]

export const generateRandomString = (): string => {
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let randomString: string = ""

  for (let i = 0; i < 16; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}
export const getUrl = (): string => {
  const clientId = import.meta.env.VITE_CLIENT_ID
  const redirectUri = import.meta.env.VITE_REDIRECT_URI
  const state = generateRandomString()
  const spotifyApi = new SpotifyWebApi({
    redirectUri,
    clientId
  })
  var url = spotifyApi.createAuthorizeURL(scopes, state)
  return url
}
// export const getUri = (): string => {
//   const state: string = generateRandomString()
//   const responseType = import.meta.env.VITE_RESPONSE_TYPE
//   const clientId = import.meta.env.VITE_CLIENT_ID
//   const redirectUri = import.meta.env.VITE_REDIRECT_URI
//   const scope = import.meta.env.VITE_SCOPE
//   const uri = `https://accounts.spotify.com/authorize?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`
//   return uri
// }
