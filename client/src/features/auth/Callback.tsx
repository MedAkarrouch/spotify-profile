import Loader from "../../components/Loader"
import { useToken } from "./useToken"

const Callback = () => {
  useToken()
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
      <Loader />
    </div>
  )
}

export default Callback
