import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
// Routes
import authRouter from "./routes/authRoutes.js"

const app = express()
app.use(
  cors({
    origin: ["http://localhost:5173"],
    // origin: ["https://loor.netlify.app"],
    credentials: true,
    sameSite: "none"
  })
)
app.use(cookieParser())
app.use("/auth", authRouter)

export default app
