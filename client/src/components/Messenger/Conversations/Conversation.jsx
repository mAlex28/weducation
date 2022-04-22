import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@material-ui/core'

import { getUser } from '../../../actions/auth'
import './styles.css'

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)

    dispatch(getUser(friendId))

    // const getUser = async () => {
    //   try {
    //     const res = await axios('/users?userId=' + friendId)
    //     setUser(res.data)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // getUser()
  }, [currentUser, conversation])

  return (
    <div className="conversation">
      <Avatar className="conversationImg" src="" alt="" />
      <span className="conversationName">jon</span>
    </div>
  )
}

export default Conversation
