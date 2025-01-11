import { Router,Response,Request } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import express from "express"
import {JWT_SECRET} from "../config.js"
export const apiRouter=Router();
import { User } from "../db.js";
import * as bcrypt from "bcrypt";
const saltRounds:number=10;
enum ResponseError{
  OK=200,
  BadRequest=411,
  ServerError=500,
  Conflict=403
}

const signSchema=zod.object({
  username:zod.string().min(3,"Username length should be more than 2"),
  password:zod.string().min(1,"Password is not given")
})

apiRouter.post('/signup',async (req : Request,res:Response) =>{
  
  try{
    const {success,error}=signSchema.safeParse(req.body);

    if(!success){
      res.status(ResponseError.BadRequest).json({message:error})
    }
    const existingUser=await User.findOne({username:req.body.username});
    if(existingUser){
      res.status(ResponseError.Conflict).json({message:"User already exists"})
    }
    let {username,password}=req.body;
    bcrypt.hash(password,saltRounds,async (error,hash:String)=>{
      if(error){
        res.status(ResponseError.ServerError).json("Server Error");
      }
      password=hash;
      const user=await User.create({username,password})
      const token=sign({id:user._id},JWT_SECRET);
      res.status(ResponseError.OK).json({ message: "Signup successful",token});
    })   
  }catch(e){
    res.status(ResponseError.ServerError).json({message:"Server Error "+e})
  }  
})

apiRouter.post('/signin',async (req:Request,res:Response)=>{
  const {success,error}=signSchema.safeParse(req.body);
  if(!success){
    res.status(ResponseError.BadRequest).json({message:error});
  }
  const user=await User.findOne({username:req.body.username})
  if(!user){
    res.status(ResponseError.Conflict).json({message:"Wrong username"});
  }
  else{
    const correct=await bcrypt.compare(req.body.password,user.password);
    if(correct){
      const token=jwt.sign({id:user._id},JWT_SECRET);
      res.status(ResponseError.OK).json({message:"Successful",token})
    }else{
      res.status(ResponseError.Conflict).json({message:"Wrong password"});
    }
  } 
})

apiRouter.post('/content',(req:Request,res:Response)=>{
  
})
