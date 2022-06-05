import React, { useEffect, useState } from "react"
import { Avatar, Typography } from "@material-ui/core"
import axios from "axios"

import "./styles.css"
import useStyles from "./styles"

const Conversation = ({ conversation, currentUser }) => {
  const classes = useStyles()
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
        className={classes.conversationImg}
        alt={conuser?.name}
        src={conuser?.profileUrl}
      />
      <Typography variant="body1" className={classes.conversationName}>{conuser?.name}</Typography>
    </div>
  )
}

export default Conversation
