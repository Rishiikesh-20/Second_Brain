import express from "express"
import {Response,Request,NextFunction} from "express"
import {ResponseError} from "./routes/index.js"
const app=express()
import jwt, { JwtPayload } from "jsonwebtoken";
const {verify}=jwt;
import { JWT_SECRET } from "./config.js";
import {ObjectId} from "mongodb"
declare global {
  namespace Express {
    interface Request {
      userId?: ObjectId;
    }
  }
}


export async function authMiddleware(req:Request,res:Response,next:NextFunction){
  console.log("Came inside Middleware")
  try{
    const authToken:string|undefined=req.headers.authorization;
    if(!authToken || !(authToken.startsWith('Bearer '))){
      console.log("Came inside not authorized")
      res.status(ResponseError.BadRequest).json("Not authorized")
    }else{

      const token=authToken.split(' ')[1];
      try{
        console.log("Came inside decoded")
        const decoded=verify(token,JWT_SECRET);
        console.log(decoded);
        if(!ObjectId.isValid((decoded as JwtPayload).userId)){
          res.json({message:"not valid userid",decoded});
        }else{
          console.log("Came inside objectId")
          req.userId=new ObjectId((decoded as JwtPayload).userId); 
        } 
        next();

      }catch(e){
        console.log({Error:e});
        res.status(ResponseError.Conflict).json("Authorization error")
      }  
    }
    console.log("Came end of middleware")
  }catch(e){
    console.log("Came inside Middleware error")
    console.log({Error:e});
    res.status(ResponseError.ServerError).json({message:e})
  }
  
}