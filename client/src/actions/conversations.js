import {
  GET_CONVERSATIONS,
  NEW_CONVERSATION,
  GET_TWO_CONVERSATIONS_OF_USERS,
} from '../constants/actionTypes'
import * as api from '../api/index.js'

export const getConversations = (id) => async (dispatch) => {
  try {
    const { data } = await api.getConversations(id)
    dispatch({ type: GET_CONVERSATIONS, payload: { data } })
  } catch (error) {
    console.log(error)
  }
}
