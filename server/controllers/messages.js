import express from "express"
import mongoose from "mongoose"

import MessageModel from "../models/message.js"
const router = express.Router()
export const addMessage = async (req, res) => {
  const newMessage = new MessageModel(req.body)

  try {
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMessage = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export default router
