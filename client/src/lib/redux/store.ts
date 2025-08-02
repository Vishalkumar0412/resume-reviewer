import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import rootReducer from "./api/rootReducer";
import { resumeApi } from "./api/resumeApi";


export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
           getDefaultMiddleware().concat(authApi.middleware,resumeApi.middleware),
})
const initalizeApp=async()=>{
    await store.dispatch(authApi.endpoints.getProfile.initiate({},{forceRefetch:true}))
}



initalizeApp();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;