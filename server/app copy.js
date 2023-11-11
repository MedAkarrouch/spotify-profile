import express from "express"
import axios from "axios"
import cors from "cors"
import queryString from "queryString"
import path from "path"
import cookieParser from "cookie-parser"

const clientId = "2ad0f4cbf0bc45f9ae3d632e30070eb0"
const clientSecret = "e4ec51b2bd9a4ee4b6981c10136f55cf"
const clientURL = "http://localhost:5173"
const redirectUri = `http://localhost:5173/callback`

const app = express()
app.use(
  cors({
    origin: ["http://localhost:5173"],
    // origin: ["https://loor.netlify.app"],
    credentials: true,
    sameSite: "none"
  })
)
app.use(cookieParser())
app.get("/callback", async (req, res) => {
  const { code, state, error } = req.query
  const originalState = req.cookies.stateKey
  // console.log(req.cookies.stateKey)
  // console.log(state)
  // console.log(req.query)
  // const isError = error || !state | !originalState | (state !== originalState)
  // if (isError)
  //   return res.status(401).json({
  //     status: "error",
  //     message: "Invalid state"
  //   })
  // else
  res.clearCookie("stateKey")
  try {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      data: queryString.stringify({
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(clientId + ":" + clientSecret).toString("base64")
      },
      json: true
    }
    const response = await axios.post(authOptions.url, authOptions.data, {
      headers: authOptions.headers
    })
    const data = response.data
    res.status(200).json({ status: "success", data })
  } catch (err) {
    console.log("message = ", err.message)
    res.status(400).json({
      status: "error",
      err
    })
  }
  // if (error) return res.send(error)
  // if (!state || !originalState || stat/e !== originalState)
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
export default app
