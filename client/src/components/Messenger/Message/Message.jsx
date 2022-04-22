import React from 'react'
import { Avatar, Typography } from '@material-ui/core'
import moment from 'moment'

import './styles.css'

const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <Avatar className="messageImg" src="" alt="avatar" />
        <Typography className="messageText" component="p">
          {/* {message.text} */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          illum quia consequatur quam, facere dolorem distinctio fugit autem
          illo, culpa repellendus fuga exercitationem voluptatem mollitia
          perspiciatis quod voluptate itaque inventore?
        </Typography>
      </div>
      <div className="messageBottom">
        {/* {moment(message.createdAt).fromNow()} */}1 hour ago
      </div>
    </div>
  )
}

export default Message
