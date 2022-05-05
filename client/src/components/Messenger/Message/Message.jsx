import React from "react"
import { Avatar, Typography } from "@material-ui/core"
import moment from "moment"

import "./styles.css"

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Avatar className="messageImg" src="" alt="avatar" />
        {/* <Avatar
          className="messageImg"
          alt={conuser?.name}
          src={conuser?.profileUrl}
        >
          {conuser?.name.charAt(0)}
        </Avatar> */}
        <Typography className="messageText" component="p">
          {message?.text}
        </Typography>
      </div>
      <div className="messageBottom">
        {moment(message?.createdAt).fromNow()}
      </div>
    </div>
  )
}

export default Message
