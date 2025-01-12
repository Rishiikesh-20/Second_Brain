import * as mongoose from "mongoose";
import* as dotenv from "dotenv"
import { string } from "zod";
dotenv.config();

// const dbConnect=async()=>{ await mongoose.connect(process.env.DB_URL || "");}
// dbConnect();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || "", {
      // Add connection options
      connectTimeoutMS: 10000, // Reduce connection timeout
      socketTimeoutMS: 45000,  // Socket timeout
      // Enable retry writes
      retryWrites: true,
      // Set write concern
      w: "majority"
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if cannot connect to database
  }
};


dbConnect();

const Userschema=new mongoose.Schema({
  username : {type:String , required:true , unique:true},
  password:{type:String,required:true}
})

export const User=mongoose.model('user',Userschema);

const TagsSchema=new mongoose.Schema({
  title:{type:String,required:true,unique:true}
})

export const Tags=mongoose.model("tag",TagsSchema)

const contentTypes=["document" , "tweet" , "youtube" , "link"]


const ContentSchema=new mongoose.Schema({
  link : {type:String , required:true},
  type:{type:String,enum: contentTypes,required:true},
  title:{type:String,required:true},
  tags:{type:[{type:mongoose.Schema.Types.ObjectId,ref:"Tags"}]},
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
})

export const Content=mongoose.model('content',ContentSchema);

const LinkSchema=new mongoose.Schema({
  hash:{type:String,required:true},
  userId:{type:mongoose.Schema.Types.ObjectId,required:true}
})

export const Link=mongoose.model('link',LinkSchema);

