import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppLayout from "./components/AppLayout"
import Callback from "./features/auth/Callback"
import Home from "./components/Home"
import PageNotAvailable from "./components/PageNotAvailable"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
          </Route>
          <Route path="/pageNotAvailable" element={<PageNotAvailable />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
