import { GET_USERS } from "../constants/actionTypes"

export default (state = { userlist: [] }, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, userlist: action.payload.data }
    default:
      return state
  }
}
