import React, { useState, useRef, useEffect } from "react"
import { Button, Container, Grid, Paper, TextField, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"

import ChatOnline from "./ChatOnline/ChatOnline"
import Conversation from "./Conversations/Conversation"
import Message from "./Message/Message"

import useStyles from "./styles"
import "./styles.css"
import { getUsers } from "../../actions/users"
import { getConversations } from "../../actions/conversations"
import { addMessage, getMessage } from "../../api"

const Messenger = () => {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem("profile"))

  const { conversations } = useSelector((state) => state.conversations)
  const { isLoading, userlist } = useSelector((state) => state.users)

  const [allUsers, setAllUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)

  const dispatch = useDispatch()
  const scrollRef = useRef()
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8000")
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    dispatch(getConversations(user?.result?._id))
  }, [dispatch, user.result._id])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user?.result?._id)
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        userlist.filter((f) => users.some((u) => u.userId == f._id))
      )
    })
  }, [user.result._id, userlist])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getMessage(currentChat?._id)
        setMessages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // create a message object to pass to the server
    const message = {
      sender: user?.result?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    }

    // get the receiver from the converstation user list
    const receiverId = currentChat.members.find(
      (member) => member != user?.result?._id
    )

    // send to the socket.io
    socket.current.emit("sendMessage", {
      senderId: user?.result?._id,
      receiverId: receiverId,
      text: newMessage,
    })

    try {
      const res = await addMessage(message)
      setMessages([...messages, res.data])
      setNewMessage("")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [messages])

  return (
    <>
      <Container className={classes.messenger} maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9} className={classes.chatMenu}>
            <Paper className={classes.chatMenuWrapper}>
               <Typography variant="subtitle1" align="left" className={classes.prevChatTypography}>
              Previous Chats
            </Typography>
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user?.result} />
                </div>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={9} className={classes.chatBox}>
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((msg) => (
                      <div ref={scrollRef}>
                        <Message
                          message={msg}
                          own={msg.sender === user?.result?._id}
                        />
                      </div>
                    ))}
                  </div>
                  <div className={classes.chatBoxBottom}>
                    <TextField placeholder="Type message..." fullWidth multiline className={classes.chatMessageInput} onChange={(e) => setNewMessage(e.target.value)} value={newMessage}/>
                    <Button className={classes.chatSubmitButton} onClick={handleSubmit}>
                      Send
                    </Button>
                  </div>
                </>
              ) : (
                <Typography variant="h6" className={classes.noConversationText}>
                  Open a conversation to start a chat
                </Typography>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={9} className={classes.chatOnline}>
            <Paper className={classes.chatOnlineWrapper}>
                 <Typography variant="subtitle1" align="left" className={classes.prevChatTypography}>
              Online users
            </Typography>
              <ChatOnline
                currentUserId={user?.result._id}
                onlineUsers={onlineUsers}
                setCurrentChat={setCurrentChat}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Messenger
