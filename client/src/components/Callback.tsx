import { useSearchParams } from "react-router-dom"
const Callback = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")
  return (
    <div>
      <h1>Callback</h1>
      <p>Code: {code}</p>
      <p>Error: {error}</p>
      <p>State: {state}</p>
    </div>
  )
}

export default Callback
