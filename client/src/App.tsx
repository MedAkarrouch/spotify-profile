import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Login from "./pages/Login"
import PageNotAvailable from "./components/PageNotAvailable"
import AppLayout from "./components/AppLayout"
import Library from "./pages/Playlists"
import Recent from "./pages/Recent"
import Profile from "./pages/Profile"
import Artists from "./pages/Artists"
import Tracks from "./pages/Tracks"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Navigate replace to="/profile" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/playlists" element={<Library />} />
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
