import { useSearchParams } from "react-router-dom"
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true
}
import axios from "axios"
import { useState } from "react"
type StateObjType = {}
const Callback = () => {
  const [searchParams] = useSearchParams()
  const [stateObj, setStateObj] = useState({})
  const code = searchParams.get("code") || ""
  const state = searchParams.get("state") || ""
  const error = searchParams.get("error") || ""
  const auth = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_API
      }/callback?code=${code}&state=${state}&error=${error}`,
      config
    )
    const data = res.data.data
    setStateObj(data)
    const ok = await fetchProfile(data.access_token)
    console.log(ok)
  }
  async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })

    return await result.json()
  }
  return (
    <div>
      <button onClick={auth}>Callback</button>
      {/* <button onClick={() => fetchProfile(stateObj?.access_token)}>
        Profile
      </button> */}
      <h1>Callback</h1>
      <p>Code: {code}</p>
      <p>Error: {error}</p>
      <p>State: {state}</p>
    </div>
  )
}

export default Callback
