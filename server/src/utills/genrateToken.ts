import jwt from "jsonwebtoken";
import { Response } from "express";
export const genrateToken = async (
  res: Response,
  user: any,
  message: string
) => {
  const token = jwt.sign(user, process.env.JWT_SECRET!);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: true,
    message,
    token,
  
  });
};
