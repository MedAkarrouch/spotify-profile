import { Link } from "react-router-dom"
import { getUrl } from "../utils/utils"

const Login = () => {
  const url = getUrl()
  return <Link to={url}>Login</Link>
}

export default Login
