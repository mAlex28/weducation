import { DELETE_USER, END_LOADING, GET_USERS, START_LOADING, UPDATE_USER } from "../constants/actionTypes"

export default (state = { isLoading:true, userlist: [] }, action) => {
  switch (action.type) {
    case START_LOADING: 
      return {...state, isLoading:true}
    case END_LOADING: 
      return {...state, isLoading: false}
    case GET_USERS:
      return { ...state, userlist: action.payload.data }
    case UPDATE_USER:
        localStorage.clear()
        localStorage.setItem("profile", JSON.stringify({ ...action.payload.data }))
      return {...state, userlist: state.userlist.map((user) => (user._id === action.payload._id ? action.payload : user)) }
    case DELETE_USER:
      return {...state, userlist: state.userlist.filter((user) => user._id !== action.payload)}
    default:
      return state
  }
}
