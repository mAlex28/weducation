import express from "express"
const router = express.Router()

import { getAllUsers, getUser, signin, signup } from "../controllers/user.js"

router.post("/signin", signin)
router.post("/signup", signup)
router.get("/", getAllUsers)
router.get("/getuser", getUser)

export default router
