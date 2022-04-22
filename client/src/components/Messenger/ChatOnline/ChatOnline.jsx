import React from 'react'
import { Avatar } from '@material-ui/core'

import './styles.css'

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend" onClick={() => {}}>
        <div className="chatOnlineImgContainer">
          <Avatar className="chatOnlineBadge" src="" alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  )
}

export default ChatOnline
