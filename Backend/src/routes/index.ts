import { Router,Response,Request } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import express from "express"
import {JWT_SECRET} from "../config.js"
export const apiRouter=Router();
import { Content, Link, Tags, User } from "../db.js";
import {ObjectId} from "mongodb"
import * as bcrypt from "bcrypt";
import {authMiddleware} from "./../middleware.js"
import crypto from "crypto";
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

apiRouter.post("/brain/share",authMiddleware,async (req:Request,res:Response)=>{
  try{
    if(req.body.share==="true"){
      const isExist=await Link.findOne({userId:req.userId});
      if(isExist){
        res.status(ResponseError.OK).json({link:process.env.BASE_URL+"api/v1/brain/"+isExist.hash})
      }
      else{
        const hash=crypto.randomBytes(16).toString('hex');
        const link=await Link.create({hash,userId:req.userId});
        const url=process.env.BASE_URL+"api/v1/brain/"+hash;
        res.status(ResponseError.OK).json({link:url})
      }
    }else{
      res.status(ResponseError.Conflict).json({message:"Status was not true"});
    }
  }catch(e){
    res.status(ResponseError.ServerError).json({message:"Error "+e})
  }
})

apiRouter.get("/brain/:sharelink",async (req:Request,res:Response)=>{
  try{
    const hash=req.params.sharelink;
    const link=await Link.findOne({hash});
    if(!link){
      res.status(404).json({message:"Link not found"});
    }else{
      let userContent=await Content.find({userId:link.userId},{userId:false,__v:false,});
      // for(let i=0;i<userContent.length;i++){
      //   if(userContent[i].tags.length>0){
      //     let tags:string|undefined|null[]=[]
      //     for(let j=0;j<userContent[i].tags.length;j++){
      //       tags[j]=await Tags.findOne({_id:userContent[i].tags[j]}{_id:false,title:true});
      //     }
      //     delete userContent[i].tags;
      //   }
      // }
      const promiseArray = userContent.map(async (e) => {
        return Promise.all(
          e.tags.map(async (element) => {const obj = await Tags.findById(element, "-_id -_v");
            return obj?.title
          })
        );
      });
      console.log(promiseArray)
      const array = await Promise.all(promiseArray);
      console.log(array);
      const ex = userContent.map((item, index) => ({
        ...item.toObject(),
        tags: array[index],
      }));
      const user=await User.findById({_id:link.userId})
      //@ts-ignore
      res.status(ResponseError.OK).json({username:user.username,contents:ex})
    }
  }catch(e){
    res.status(ResponseError.ServerError).json({message:e});
  }
  
})
