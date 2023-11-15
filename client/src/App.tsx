import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Login from "./features/auth/Login"
import PageNotAvailable from "./components/PageNotAvailable"
import AppLayout from "./components/AppLayout"
import Library from "./components/Library"
import Recent from "./components/Recent"
import Profile from "./components/Profile"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Navigate replace to="/profile" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/recent" element={<Recent />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Navigate replace to="/login" />} />
        <Route path="*" element={<PageNotAvailable />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
