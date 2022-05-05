import {
  GET_CONVERSATIONS,
  NEW_CONVERSATION,
  GET_USER,
  GET_TWO_CONVERSATIONS_OF_USERS,
} from "../constants/actionTypes"

export default (state = { conversations: [] }, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return { ...state, conversations: action.payload.data }
    default:
      return state
  }
}
