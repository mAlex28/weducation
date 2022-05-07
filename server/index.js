import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import postRoutes from "./routes/posts.js"
import userRouter from "./routes/user.js"
import conversationRoutes from "./routes/conversations.js"
import messageRoutes from "./routes/messages.js"

const app = express()
dotenv.config()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use("/posts", postRoutes)
app.use("/user", userRouter)
app.use("/conversations", conversationRoutes)
app.use("/messages", messageRoutes)

app.get("/", (req, res) => {
  res.send("API is running")
})

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set("useFindAndModify", false)
