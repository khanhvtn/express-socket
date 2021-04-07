import { combineReducers } from 'redux'
import eventReducer from './event'
import userReducer from './user'
import errorReducer from './error'

const rootReducer = combineReducers({
    event: eventReducer,
    user: userReducer,
    error: errorReducer,
})

export default rootReducer;