import React from "react"
import axios from "axios"
import { Avatar, Typography } from "@material-ui/core"

import "./styles.css"
import useStyles from "./styles"

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const classes = useStyles()

  const handleClick = async (user) => {
    try {
      // check if the conversation already exists
      const res = await axios.get(
        `/conversations/find/${currentUserId}/${user._id}`
      )

      if (res.data == null) {
        // if there's no conversation create a new one
        const pres = await axios.post('/conversations', {
          senderId: currentUserId,
            receiverId: user._id,
        })
        setCurrentChat(pres.data)
      } else {
        setCurrentChat(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="chatOnline">
      {onlineUsers.map((online) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(online)}>
          <div className="chatOnlineImgContainer">
            <Avatar
              className={classes.chatOnlineImg}
              src={online?.imageUrl}
              alt={online?.name}
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <Typography className={classes.chatOnlineName}>{online?.name}</Typography>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline
