import express from "express"
const router = express.Router()
import { logout, login, callback } from "../controllers/authController.js"
router.get("/login", login)
router.get("/callback", callback)
router.get("/logout", logout)

export default router
