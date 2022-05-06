import React from "react"
import { Avatar } from "@material-ui/core"

import "./styles.css"

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend" onClick={() => {}}>
        <div className="chatOnlineImgContainer">
          <Avatar className="conversationImg" src="" alt="" />
          {/* <Avatar
            className="chatOnlineBadge"
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt="user profile picture"
          /> */}
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">d</span>
      </div>
    </div>
  )
}

export default ChatOnline
