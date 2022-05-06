import { GET_USERS } from "../constants/actionTypes"
import * as api from "../api/index.js"

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers()
    console.log(data)
    dispatch({ type: GET_USERS, payload: data })
  } catch (error) {
    console.log(error)
  }
}
