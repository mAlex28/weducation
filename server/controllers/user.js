import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from 'mongoose';

import UserModal from "../models/user.js"

const secret = "test"

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const oldUser = await UserModal.findOne({ email })

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5h",
    })

    res.status(200).json({ result: oldUser, token })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const signup = async (req, res) => {
  const { email, password, imageUrl, firstName, lastName } = req.body

  try {
    const oldUser = await UserModal.findOne({ email })

    if (oldUser) return res.status(400).json({ message: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await UserModal.create({
      imageUrl,
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    })

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "5h",
    })

    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const getUser = async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username
  try {
    const user = userId
      ? await UserModal.findById(userId)
      : await UserModal.findOne({ username: username })
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModal.find()
    res.json({ data: allUsers })
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: "Something went wrong" })
  }
}
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, imageUrl, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Could not update user`);

  const updatedUser = { name, email, imageUrl, password, _id: id };

  await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Could not delete user');

  await UserModal.findByIdAndRemove(id);

  res.json({ message: "User deleted successfully." });
}