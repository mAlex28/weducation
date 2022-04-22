import express from 'express'

import { addMessage, getMessage } from '../controllers/messages.js'

const router = express.Router()

router.post('/', addMessage)
router.get('/:conversationId', getMessage)

export default router
