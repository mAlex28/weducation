import express from "express"
const router = express.Router()

import { getUser, signin, signup } from "../controllers/user.js"

router.post("/signin", signin)
router.post("/signup", signup)
router.get("/getuser", getUser)

export default router
