import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"

import ChatOnline from "./ChatOnline/ChatOnline"
import Conversation from "./Conversations/Conversation"
import Message from "./Message/Message"

import "./styles.css"
import { getConversations } from "../../actions/conversations"
import { addMessage, getMessage, getUsers } from "../../api"

const Messenger = () => {
    // const classes = useStyles()
  const user = JSON.parse(localStorage.getItem("profile"))
  const { conversations } = useSelector((state) => state.conversations)
  const { userlist } = useSelector((state) => state.userlist)
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])
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
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await getUsers()
        setAllUsers(res.data)

      } catch (err) {
        console.log(err)
      }
    }

    getAllUsers()
  }, [user])

  useEffect(() => {
    dispatch(getConversations(user?.result?._id))
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    socket.current.emit("addUser", user?.result?._id)
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        userlist.filter((f) => users.some((u) => f._id == u.userId))
      )
    })
  }, [user])

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
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user?.result} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
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
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Send message..."
                    className="chatMessageInput"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    rows={1}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline currentUserId={user?.result._id} onlineUsers={onlineUsers} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
