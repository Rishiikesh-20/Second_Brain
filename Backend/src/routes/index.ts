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
const D=new Date();
let date=D.getDate();
let month=D.getMonth()+1;
let year=D.getFullYear();
let totalDate=date+"/"+month+"/"+year;

interface ContentType{
  type:String,
  link?:String,
  title:String,
  content?:String,
  tags?:ObjectId[],
  date:string,
  userId:ObjectId
}

apiRouter.post('/content',authMiddleware,async (req:Request,res:Response)=>{
  console.log("Came inside content")
  console.log(req.body)
  try{
    console.log(req.body)
    const contentSchema=zod.object({
      type:zod.enum(["document" , "tweet" , "youtube" ,"link"]),
      link:zod.string().optional(),
      title:zod.string(),
      tags:zod.array(zod.string()).optional(),
      content:zod.string().optional()
    })
  
    const {success,error}=contentSchema.safeParse(req.body);
  
    if(!success){
      console.log("Came inside !success")
      res.status(ResponseError.BadRequest).json({message:"Inputs are wrong "+error});
    }else{
      if(!req.userId){
        res.json({message:"Userid is not there in request"});
      }else{
        let content1:ContentType={type:req.body.type,date:totalDate,title:req.body.title,userId:req.userId}
        let tagsObject:ObjectId[]=[];
        if(req.body.tags){
          for(let i=0;i<req.body.tags.length;i++){
            const isExist=await Tags.findOne({title:req.body.tags[i]});
            if(!isExist){
              let {_id}=await Tags.create({title:req.body.tags[i]});
              tagsObject.push(_id);
            }else{
              tagsObject.push(isExist._id);
            }
          }
          content1={...content1,tags:tagsObject}
        }
        if(req.body.content){
          content1={...content1,content:req.body.content}
        }
        if(req.body.link){
          content1={...content1,link:req.body.link}
        }
        await Content.create(content1);
        res.status(ResponseError.OK).json({message:"Successfully content added"});
      }
    }
  }catch(e){
    res.status(ResponseError.ServerError).json({message:"Unexpected error "+e});
  }
  
})

apiRouter.get('/content',authMiddleware,async (req:Request,res:Response)=>{
  try{
      const documents = await Content.find({ userId: req.userId });
      const promiseArray = documents.map(async (doc) => {
          const tags = await Promise.all(
              doc.tags.map(async (tagId) => {
                  const tag = await Tags.findById(tagId, "title");
                  return tag ? tag.title : null;
              })
          );
          return { ...doc.toObject(), tags: tags.filter(Boolean) };
      });
      const resolvedDocuments = await Promise.all(promiseArray);
      res.status(200).json({ content: resolvedDocuments });
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
  console.log(req.body);
  try{
    if(req.body.share==="true"){
      const isExist=await Link.findOne({userId:req.userId});
      if(isExist){
        res.status(ResponseError.OK).json({link:isExist.hash})
      }
      else{
        const hash=crypto.randomBytes(16).toString('hex');
        const link=await Link.create({hash,userId:req.userId});
        const url=hash;
        res.status(ResponseError.OK).json({link:url})
      }
    }else{
      res.status(ResponseError.Conflict).json({message:"Status was not true"});
    }
  }catch(e){
    console.log(e)
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
