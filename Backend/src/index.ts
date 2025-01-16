import express from "express";
import { apiRouter } from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors"
const app=express();
const port :number = 3000;
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/v1',apiRouter);


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})