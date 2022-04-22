import { combineReducers } from 'redux'

import posts from './posts'
import auth from './auth'
import conversations from './conversations'

export const reducers = combineReducers({ conversations, posts, auth })
