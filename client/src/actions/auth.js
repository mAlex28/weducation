import { AUTH, ERROR, GET_USER } from "../constants/actionTypes"
import * as api from "../api/index.js"

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: AUTH, data })

    router.push("/")
  } catch (error) {
    dispatch({ type: ERROR, message: error.message })
  }
}

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)

    dispatch({ type: AUTH, data })

    router.push("/")
  } catch (error) {
    dispatch({ type: ERROR, message: error.message })
  }
}

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id)

    dispatch({ type: GET_USER, payload: { user: data } })
  } catch (error) {
    console.log(error)
  }
}
