import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Avatar } from "@material-ui/core"
import axios from "axios"

import "./styles.css"

const Conversation = ({ conversation, currentUser }) => {
  const [conuser, setConuser] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)

    const getFriendUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/user/getuser?userId=" + friendId
        )
        setConuser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getFriendUser()
  }, [currentUser, conversation])

  return (
    <div className="conversation">
      <Avatar
        className="conversationImg"
        alt={conuser?.name}
        src={conuser?.profileUrl}
      >
        {conuser?.name.charAt(0)}
      </Avatar>
      <span className="conversationName">{conuser?.name}</span>
    </div>
  )
}

export default Conversation
