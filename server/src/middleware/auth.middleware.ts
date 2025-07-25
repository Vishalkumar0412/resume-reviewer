import { NextFunction, Request,Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApiResponse } from "../helper/types/apiResponse";
export const authMiddleware=async(req:any,res:Response<ApiResponse>,next:NextFunction)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message:"Unauthanticated user",
                success:false
            })
        }
        const decode :any= jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload;
        if(!decode){
            return res.status(400).json({
                message:"Token is not valid",
                success:false
            })

        }

        (req as any & { user?: JwtPayload}).user=decode 
        next();
    } catch (error:any) {
        return res.status(500).json({
            message:"Unable to verify token",
            success:false,
            error:error.data.message
        })
    }
}