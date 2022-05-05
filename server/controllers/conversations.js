import express from "express"
import mongoose from "mongoose"

import ConversatioModel from "../models/conversation.js"
const router = express.Router()

export const newConversation = async (req, res) => {
  const newCon = new ConversatioModel({
    members: [req.body.senderId, req.body.receiverId],
  })

  try {
    const savedConversation = await newCon.save()
    res.status(200).json(savedConversation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getConversations = async (req, res) => {
  try {
    const conversation = await ConversatioModel.find({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getTwoConversationsOfUsers = async (req, res) => {
  try {
    const conversation = await ConversatioModel.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    })
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default router
