import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"

import ChatOnline from "./ChatOnline/ChatOnline"
import Conversation from "./Conversations/Conversation"
import Message from "./Message/Message"

import "./styles.css"
import { getConversations } from "../../actions/conversations"
import { addMessage, getMessage } from "../../api"

const Messenger = () => {
  //   const classes = useStyles()
  const user = JSON.parse(localStorage.getItem("profile"))
  const { conversations } = useSelector((state) => state.conversations)
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const dispatch = useDispatch()
  const scrollRef = useRef()
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8900")
  }, [])

  useEffect(() => {
    socket.current.emit("addUser", user?.result?._id)
    socket.current.on("getUsers", (users) => {
      console.log(users)
    })
  }, [user])

  useEffect(() => {
    dispatch(getConversations(user?.result?._id))
  }, [dispatch])

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
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
