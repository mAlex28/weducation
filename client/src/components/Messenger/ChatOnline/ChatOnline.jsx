import React from "react"
import { Avatar } from "@material-ui/core"

import "./styles.css"

const ChatOnline = ({onlineUsers, currentUserId}) => {

   const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentUserId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatOnline">
       {onlineUsers.map((online) => (
      <div className="chatOnlineFriend" onClick={() => handleClick(online)}>
        <div className="chatOnlineImgContainer">
          <Avatar className="conversationImg" src={online?.name} alt={online?.imageUrl}>
            {online?.name.charAt(0)}
          </Avatar>
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{online?.name}</span>
      </div>
       ))}
    </div>
  )
}

export default ChatOnline
