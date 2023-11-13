import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Login from "./features/auth/Login"
import PageNotAvailable from "./components/PageNotAvailable"
import Home from "./components/Home"
import AppLayout from "./components/AppLayout"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Navigate replace to="/login" />} />
          <Route path="*" element={<PageNotAvailable />} />
          <Route index path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
