import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "../features/auth/Login"

const LoginScreen = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default LoginScreen
