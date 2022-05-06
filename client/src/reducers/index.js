import { combineReducers } from "redux"

import posts from "./posts"
import auth from "./auth"
import conversations from "./conversations"
import users from "./users"

export const reducers = combineReducers({ users, conversations, posts, auth })
