import { Router,Response,Request } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import express from "express"
import {JWT_SECRET} from "../config.js"
export const apiRouter=Router();
import { Content, Tags, User } from "../db.js";
import {ObjectId} from "mongodb"
import * as bcrypt from "bcrypt";
import {authMiddleware} from "./../middleware.js"
const saltRounds:number=10;
export enum ResponseError{
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
      const token=sign({userId:user._id},JWT_SECRET);
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
      const token=jwt.sign({userId:user._id},JWT_SECRET);
      res.status(ResponseError.OK).json({message:"Successful",token})
    }else{
      res.status(ResponseError.Conflict).json({message:"Wrong password"});
    }
  } 
})

interface ContentType{
  type:String,
  link:String,
  title:String,
  tags?:ObjectId[],
  userId:ObjectId
}

apiRouter.post('/content',authMiddleware,async (req:Request,res:Response)=>{
  console.log("Came inside content")
  console.log(req.body)
  try{
    const objectIdSchema = zod
    .string()
    .refine((value) => ObjectId.isValid(value), {
      message: "Invalid ObjectId",
    });
    const contentSchema=zod.object({
      type:zod.enum(["document" , "tweet" , "youtube" ,"link"]),
      link:zod.string(),
      title:zod.string(),
      tags:zod.array(zod.string())
    })
  
    const {success,error}=contentSchema.safeParse(req.body);
  
    if(!success){
      res.status(ResponseError.BadRequest).json({message:"Inputs are wrong "+error});
    }else{
      if(!req.userId){
        res.json({message:"Userid is not there in request"});
      }else{
        
        const {type,link,title,tags}=req.body;
        let tagsObject:ObjectId[]=[];
        for(let i=0;i<tags.length;i++){
          const isExist=await Tags.findOne({title:tags[i]});
          if(!isExist){
            let {_id}=await Tags.create({title:tags[i]});
            tagsObject.push(_id);
          }else{
            tagsObject.push(isExist._id);
          }
        }
        let content:ContentType={type,link,title,tags:tagsObject,userId:req.userId}
        await Content.create(content);
        res.status(ResponseError.OK).json({message:"Successfully content added"});
      }
    }
  }catch(e){
    res.status(ResponseError.ServerError).json({message:"Unexpected error "+e});
  }
  
})

apiRouter.get('/content',authMiddleware,async (req:Request,res:Response)=>{
  try{
    const documents=await Content.find({userId:req.userId});
    console.log(documents);
    res.status(ResponseError.OK).json({content:documents})
  }catch(e){
    console.log(e);
    res.status(ResponseError.ServerError).json({message:e});
  }
})

apiRouter.delete('/content',authMiddleware,async (req:Request,res:Response)=>{
  try{
    const deleteId=req.body.contentId;
    const document=await Content.findByIdAndDelete({_id:deleteId});
    if(!document){
      res.status(ResponseError.Conflict).json({message:"Trying to delete a doc you don't own"});
    }
    res.status(ResponseError.OK).json({message:"Successful"});
  }catch(e){
    console.log(e);
    res.status(ResponseError.ServerError).json({message:e});
  }
  
})
