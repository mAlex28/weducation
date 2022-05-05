import express from "express"

import {
  newConversation,
  getConversations,
  getTwoConversationsOfUsers,
} from "../controllers/conversations.js"

const router = express.Router()

router.post("/", newConversation)
router.get("/:userId", getConversations)
router.get("/find/:firstUserId/:secondUserId", getTwoConversationsOfUsers)

export default router
