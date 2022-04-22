import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatOnline from './ChatOnline/ChatOnline'
import Conversation from './Conversations/Conversation'
import Message from './Message/Message'

// import useStyles from './styles'
import './styles.css'
import { getConversations } from '../../actions/conversations'

const Messenger = () => {
  //   const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const { conversations } = useSelector((state) => state.conversations)

  // const [currentChat, setCurrentChat] = useState(null)
  // const [messages, setMessages] = useState([])
  // const [newMessage, setNewMessage] = useState('')
  // const [arrivalMessage, setArrivalMessage] = useState(null)
  // const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(() => {
    dispatch(getConversations(user?.result?._id))
  }, [dispatch])

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <Conversation conversation={c} currentUser={user?.result} />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                placeholder="Send message..."
                className="chatMessageInput"
                rows={1}
              />
              <button className="chatSubmitButton">Send</button>
            </div>
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
