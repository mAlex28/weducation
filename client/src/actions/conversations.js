import {
  GET_CONVERSATIONS,
  NEW_CONVERSATION,
  GET_TWO_CONVERSATIONS_OF_USERS,
} from "../constants/actionTypes"
import * as api from "../api/index.js"

export const getConversations = (id) => async (dispatch) => {
  try {
    const { data } = await api.getConversations(id)

    dispatch({ type: GET_CONVERSATIONS, payload: { data } })

  } catch (error) {
    console.log(error)
  }
}

export const createConversation = (conbody) => async (dispatch) => {
  try {
    const { data } = await api.newConversation(conbody)

    dispatch({ type: NEW_CONVERSATION, payload: { data } })

  } catch (error) {
    console.log(error)
  }
}

export const getTwoMemberConversations = (firstUserId, secondUserId) => async (dispatch) => {
  try {
    const { data } = await api.getTwoConversationsOfUsers(firstUserId, secondUserId)

    dispatch({ type: GET_TWO_CONVERSATIONS_OF_USERS, payload: { data } })

  } catch (error) {
    console.log(error)
  }
}