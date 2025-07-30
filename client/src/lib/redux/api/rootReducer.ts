import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from '../slice/authSlice'

const rootReducer= combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer
})
export default rootReducer;