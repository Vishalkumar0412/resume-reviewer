import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ApiResponse } from "../helper/types/apiResponse";
import bcrypt from 'bcrypt'

import { loginSchema, signupSchema } from "../helper/schemas/user.schema";
import { genrateToken } from "../utills/genrateToken";
import { authenticatedRequest } from "../helper/types/authenticatedRequest";

const prisma=new PrismaClient()

export const signupUser = async (req: Request, res:Response<ApiResponse>) : Promise<Response<ApiResponse>> => {
  const userData = req.body;
    const parsed=signupSchema.safeParse(userData)
    if(parsed.error){
        return res.status(400).json({
            success:false,
            message:"validation error",
            error:parsed.error.flatten().fieldErrors
        })
    }
    const {name,email,password}=parsed.data;
    
    try {
        const user=await prisma.user.findUnique({where:{email}});
        if(user){
          return res.status(400).json({
            success:false,
            message:"User is already exist",
            error:"User is already exist"
          })

        }
        const hashPassword=await bcrypt.hash(password,10);
         await prisma.user.create({data:{
            email,
            password:hashPassword,
            name
         }})
         return res.status(200).json({
            success:true,
            message:"User signup successfully"
         })
    } catch (error:any) {
        return res.status(500).json({
            success:false,
            message:"User can't signup",
            error:error.data.message

    })
  
    }
}
export const loginUser=async(req:Request , res:Response<ApiResponse>)=>{
    const userData=req.body;
    const parsed=loginSchema.safeParse(userData);
    if(parsed.error){
        return res.status(400).json({message:"Validation error",success:false,error:parsed.error.flatten().fieldErrors})
    }try {
        const {email,password}=parsed.data;
        const user=await prisma.user.findUnique({where:{email}});
        if(!user){
            return res.status(400).json({
                message:"Email or password invalid",
                success:false
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Email or password invalid",
                success:false
            })
        }
        genrateToken(res,user, ` welcome back ${user.name}`)


    } catch (error:any) {
        return res.status(500).json({message:"User can't login",error:error.message,success:false})
    }

}
export const logout =async (req:Request, res:Response <ApiResponse>)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"User logout successfully",
            success:true
        })

    } catch (error) {
        return res.status(500).json({
            message:"Failed to logout",
            success:false
        })
    }

}
export const getProfile =async (req:any ,res:Response<ApiResponse>)=>{
    const user :any =req.user ;
    try {
       if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false
        })

       }
       const {password , ...safeUser}=user;
       return res.status(200).json({
        message:"User fetched",
        success:true,
        data :safeUser
       })

    } catch (error) {
         return res.status(500).json({
    success: false,
    message: "Failed to fetch profile",
    error: (error as Error).message,
  });
    }

}