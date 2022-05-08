import { DELETE_USER, GET_USERS, UPDATE_USER, START_LOADING, END_LOADING } from "../constants/actionTypes"
import * as api from "../api/index.js"

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers()
    
    dispatch({ type: GET_USERS, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user)

    dispatch({ type: UPDATE_USER, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = (id, history) => async (dispatch) => {
  try {
     await api.deleteUser(id)

    dispatch({ type: DELETE_USER, payload: id })
    history.push(`/auth`)
  } catch (error) {
    console.log(error)
  }
}
