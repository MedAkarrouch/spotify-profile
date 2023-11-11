import axios from "axios"
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true
}

const Login = () => {
  const login = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API}/auth/login`,
      config
    )
    const url = res.data.url
    window.location.href = url
  }

  return <button onClick={login}>Login</button>
}

export default Login
