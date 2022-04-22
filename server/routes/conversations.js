import express from 'express'

import {
  newConversation,
  getConversation,
  getTwoConversationsOfUsers,
} from '../controllers/conversations.js'

const router = express.Router()

router.post('/', newConversation)
router.get('/:userId', getConversation)
router.get('/find/:firstUserId/:secondUserId', getTwoConversationsOfUsers)

export default router

// {
//     "senderId": "6262cea4c013c2a10fe034b3",
//     "receiverId": "62601223a7edb39728742762"
// }
