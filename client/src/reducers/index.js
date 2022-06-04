import { combineReducers } from "redux"

import posts from "./posts"
import auth from "./auth"
import conversations from "./conversations"
import users from "./users"
import errorMessage from "./errors"

export const reducers = combineReducers({ users, errorMessage, conversations, posts, auth })
