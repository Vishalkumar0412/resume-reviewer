import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from '../slice/authSlice'
import { resumeApi } from "./resumeApi";

const rootReducer= combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [resumeApi.reducerPath]:resumeApi.reducer,
    auth:authReducer
})
export default rootReducer;