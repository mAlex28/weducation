import React from 'react'
import { Avatar, Typography } from '@material-ui/core'

import './styles.css'

const Message = ({ own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <Avatar className="messageImg" src="" alt="" />
        <Typography className="messageText" component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolore
          itaque hic veniam doloribus suscipit, at architecto distinctio omnis
          repudiandae.
        </Typography>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message
