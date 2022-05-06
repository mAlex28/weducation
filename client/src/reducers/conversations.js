import { GET_CONVERSATIONS } from "../constants/actionTypes"

export default (state = { conversations: [] }, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return { ...state, conversations: action.payload.data }
    default:
      return state
  }
}
