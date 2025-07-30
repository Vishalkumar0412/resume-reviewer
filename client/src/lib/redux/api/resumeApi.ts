import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


 export const resumeApi = createApi({
  reducerPath: 'resumeApi',
 baseQuery:fetchBaseQuery({
    baseUrl:`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/resume`,
    credentials:"include"
 }),
  endpoints: (builder) => ({
        getResumes:builder.query({
            query:()=>({
                url:"/",
                method:"GET",
            }),
        }),

         uploadResume: builder.mutation({
            query:(file)=>({
                url:"/upload-resume",
                method:"POST",
                body:file
            }),
         }),

        uploadJD: builder.mutation({
            query:(text)=>({
                url:"/upload-jd",
                method:"POST",
                body:text
            }),
     }),
    
     reviewResume:builder.mutation({
        query:(obj)=>({
            url:"/review-resume",
            method:"POST",
            body:obj
        })
     })

 })

})
export const {}=resumeApi
