import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Login from "./features/auth/Login"
import PageNotAvailable from "./components/PageNotAvailable"
import Home from "./components/Home"
import AppLayout from "./components/AppLayout"
// import ProtectedRoute from "./ui/ProtectedRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<PageNotAvailable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
