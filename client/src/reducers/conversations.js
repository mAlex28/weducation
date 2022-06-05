import { GET_CONVERSATIONS, GET_TWO_CONVERSATIONS_OF_USERS, NEW_CONVERSATION } from "../constants/actionTypes"

export default (state = { conversations: [] }, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return { ...state, conversations: action.payload.data };
    case NEW_CONVERSATION:
      return { ...state, conversation: action.payload.data }
    case GET_TWO_CONVERSATIONS_OF_USERS:
      return { ...state, conversation: action.payload.data }
    default:
      return state;
  }
}
