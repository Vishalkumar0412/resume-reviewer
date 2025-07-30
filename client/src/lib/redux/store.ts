import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import rootReducer from "./api/rootReducer";


export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
           getDefaultMiddleware().concat(authApi.middleware),
})
const initalizeApp=async()=>{
    await store.dispatch(authApi.endpoints.getProfile.initiate({},{forceRefetch:true}))
}
initalizeApp();

