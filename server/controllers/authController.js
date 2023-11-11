import axios from "axios"
import queryString from "querystring"

import { generateRandomString } from "../utils/utils.js"

export const login = (req, res, next) => {
  const state = generateRandomString(16)
  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public"

  res.cookie("stateKey", state)
  const url =
    "https://accounts.spotify.com/authorize?" +
    queryString.stringify({
      response_type: "code",
      client_id: process.env.clientId,
      scope,
      redirect_uri: process.env.redirectUri,
      state
    })
  res.status(200).json({
    status: "success",
    url
  })
}

export const logout = (req, res, next) => {}

export const callback = async (req, res, next) => {
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
        redirect_uri: process.env.redirectUri,
        grant_type: "authorization_code"
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(
            process.env.clientId + ":" + process.env.clientSecret
          ).toString("base64")
      },
      json: true
    }
    const response = await axios.post(authOptions.url, authOptions.data, {
      headers: authOptions.headers
    })
    const data = response.data
    console.log("Data", data)
    res.cookie("access-token", data["access_token"], {
      expires: new Date(Date.now() + data.expires_in)
    })
    res.cookie("refresh_token", data["refresh_token"], {
      expires: new Date(Date.now() + data.expires_in)
    })
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
}
