import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = async (
  res: Response,
  user: any,
  message: string
) => {
  const token = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: "7d", // optional but good practice
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message,
    token,
  });
}