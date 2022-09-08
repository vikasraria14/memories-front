import {configureStore} from '@reduxjs/toolkit'
import loggedInUserReducer from './loggedInUserReducer'
import postReducer from './postReducer';

const store=configureStore({
    reducer:{
        loggedInUser:loggedInUserReducer,
        posts:postReducer
    }
})
export default store;