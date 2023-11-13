import { BrowserRouter, Route } from "react-router-dom"
import Callback from "../features/auth/Callback"
import PageNotAvailable from "../components/PageNotAvailable"
import Home from "../components/Home"

const HomeScreen = () => {
  return (
    <BrowserRouter>
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/pageNotAvailable" element={<PageNotAvailable />} />
    </BrowserRouter>
  )
}

export default HomeScreen
