import React from 'react'
import { Avatar } from '@material-ui/core'

import './styles.css'

const Conversation = () => {
  return (
    <div className="conversation">
      <Avatar className="conversationImg" src="" alt="" />
      <span className="conversationName">JOhn does</span>
    </div>
  )
}

export default Conversation
