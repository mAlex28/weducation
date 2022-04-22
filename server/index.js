import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

import postRoutes from './routes/posts.js'
import userRouter from './routes/user.js'
import conversationRoutes from './routes/conversations.js'
import messageRoutes from './routes/messages.js'

dotenv.config()

const app = express()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRouter)
app.use('/conversations', conversationRoutes)
app.use('/messages', messageRoutes)

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

mongoose.set('useFindAndModify', false)

// const SPORT = 8080
// const server = http.createServer(app)
// const io = new Server(server)
// const activeUsers = new Set()

// server.listen(SPORT, () =>
//   console.log(`socket running on port http://localhost:${SPORT}`)
// )

// io.on('connection', (socket) => {
//   console.log('New client connected')

//   socket.on('new user', (data) => {
//     socket.userId = data
//     activeUsers.add(data)
//     io.emit('new user', [...activeUsers])
//   })

//   socket.on('disconnect', () => {
//     activeUsers.delete(socket.userId)
//     io.emit('user disconnected', socket.userId)
//     console.log('Client disconnected')
//   })
// })
