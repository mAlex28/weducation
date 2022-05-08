import express from "express"
import { deleteUser, getAllUsers, getUser, signin, signup, updateUser } from "../controllers/user.js"

const router = express.Router()
import auth from "../middleware/auth.js";

router.post("/signin", signin)
router.post("/signup", signup)

router.get("/", getAllUsers)
router.get("/getuser", getUser)

router.patch('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser);

export default router
