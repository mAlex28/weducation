import axios from "axios"

// https://weducation.herokuapp.com/
const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`
  }

  return req
})

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsByCreator = (name) =>
  API.get(`/posts/creator?name=${name}`)
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  )
export const createPost = (newPost) => API.post("/posts", newPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value })
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const fetchUsersPostsByCount = (id) => API.get(`/posts/count?creator=${id}`)
export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post("/user/signup", formData)
export const getUser = (id) => API.get(`/user/getuser?userId=${id}`)
export const getUsers = () => API.get("/user")
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser)
export const deleteUser = (id) => API.delete(`/user/${id}`)
export const getConversations = (id) => API.get(`/conversations/${id}`)
export const newConversation = () => API.get("/conversations")
export const getTwoConversationsOfUsers = (fid, sid) =>
  API.get(`/conversations/find/${fid}/${sid}`)
export const addMessage = (formData) => API.post("/messages", formData)
export const getMessage = (conversationId) =>
  API.get(`/messages/${conversationId}`)
