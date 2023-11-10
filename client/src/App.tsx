import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import Callback from "./components/Callback"
import Login from "./components/Login"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
