import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../slice/authSlice';

 export const authApi = createApi({
  reducerPath: 'authApi',
 baseQuery:fetchBaseQuery({
    baseUrl:`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user`,
    credentials:"include"
 }),
  endpoints: (builder) => ({
        signup:builder.mutation<{user:string},{email:string, name:string, password:string}>({
            query:(credentials)=>({
                url:"/signup",
                method:"POST",
                body: credentials

            }),
        }),

         login: builder.mutation<{ user: string }, { email: string; password: string }>({
            query:(data)=>({
                url:"/login",
                method:"POST",
                body:data
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    const result= await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error);
                    
                }
            }
         }),
         getProfile:builder.query({
            query:()=>({
                url:'/',
                method:"GET"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    const result= await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error);
                    
                }
            }

         }),
         logout:builder.mutation({
            query:()=>({
                url:'/logout',
                method:"POST"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    await queryFulfilled;
                    dispatch(userLoggedIn({user:null}))
                } catch (error) {
                    console.log(error);
                    
                }
            }
         })
  }),
})

export const {useSignupMutation,useLoginMutation,useGetProfileQuery,useLogoutMutation}=authApi
