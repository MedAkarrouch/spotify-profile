const express = require("express")
const cors = require("cors")
const queryString = require("querystring")
const path = require("path")
const cookieParser = require("cookie-parser")
const clientId = "2ad0f4cbf0bc45f9ae3d632e30070eb0"
const port = 8000
const redirectUri = `http://localhost:${port}/callback`
function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let randomString = ""

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}

// Example usage:
const app = express()
app.use(cors())
app.use(cookieParser())
app.get("/test", (req, res) => {
  res.sendFile(path.resolve())
})
app.get("/callback", (req, res) => {
  const { code, state, error } = req.query
  const originalState = req.cookies.stateKey
  console.log(req.cookies.stateKey)
  console.log(state)
  if (error) return res.send(error)
  if (!state || !originalState || state !== originalState)
    return res.send("State mismatch")
  else res.send(`<h1>${code}</h1>`)
})
app.get("/", (req, res) => {
  const state = generateRandomString()
  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public"

  res.cookie("stateKey", state)

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: clientId,
        scope,
        redirect_uri: redirectUri,
        state
      })
  )
})
app.get("/login", (req, res) => {
  const state = generateRandomString()
  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public"

  res.cookie("stateKey", state)
  const url =
    "https://accounts.spotify.com/authorize?" +
    queryString.stringify({
      response_type: "code",
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      state
    })
  res.status(200).json({
    status: "success",
    url
  })
})
app.listen(port, () => {
  console.log("Listening on port ", port)
})
