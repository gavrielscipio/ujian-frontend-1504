import {combineReducers} from 'redux'

// beda kurung kurawal karna di berbeda cara export di dalam komponen reducernya.
import userReducer from './userReducer'
// import {historyReducer} from './historyReducer'

const allReducers = combineReducers ({
    user: userReducer
}) 

export default allReducers