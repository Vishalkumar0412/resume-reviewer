import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 export const authApi = createApi({
  reducerPath: 'authApi',
 baseQuery:fetchBaseQuery({
    baseUrl:`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
    credentials:"include"
 }),
  endpoints: (builder) => ({
        signup:builder.mutation<{user:string},{email:string, name:string, password:string}>({
            query:(credentials)=>({
                url:"/user/signup",
                method:"POST",
                body: credentials

            }),
        }),

         login: builder.mutation<{ user: string }, { email: string; password: string }>({
            query:(data)=>({
                url:"/user/login",
                method:"POST",
                body:data
            })
         }),
         getProfile:builder.query({
            query:()=>({
                url:'/user/'
            })
         })
  }),
})

export const {useSignupMutation,useLoginMutation}=authApi
