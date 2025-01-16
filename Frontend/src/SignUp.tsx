import { useEffect, useState } from "react";
import { Input } from "./components/ui/Input";
import { BrainIcon } from "./components/ui/brainIcon";
import { Button } from "./components/ui/Button";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DB_URL } from "./components/DbUrl";
interface Sign1{
  sign:string,
}
export function Sign(props:Sign1){
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  //const divref=useRef<HTMLDivElement>(null);
  const [error,setError]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/Dashboard")
    }
  },[])
  
  async function signUp(){
    console.log("Inside signup")
    await axios.post(`${DB_URL}api/v1/signup`,{username,password},{headers:{"content-Type":"application/json"}}).then(response=>{
      if(response.status===200){
        localStorage.setItem("token",response.data.token);
        navigate('/Dashboard');
      }
    }).catch((err)=>{
      if (err.response) {
        switch (err.response.status) {
          case 411:
            setError(
              "Invalid input: " +
                (err.response.data.Zoderror?.issues?.[0]?.message ||
                  "Please check your inputs")
            );
            break;
          case 403:
            setError("Username already exists");
            break;
          case 500:
            setError("Server error. Please try again later");
            break;
          default:
            setError("An error occurred. Please try again");
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection");
      } else {
        setError("An error occurred. Please try again");
      }
    })
    
  }
  async function signIn(){
    console.log("Inside signin")
    await axios.post(`${DB_URL}api/v1/signin`,{username,password},{headers:{"content-Type":"application/json"}}).then(response=>{
      if(response.status===200){
        localStorage.setItem("token",response.data.token);
        navigate('/Dashboard');
      }
    }).catch((err)=>{
      if (err.response) {
        switch (err.response.status) {
          case 411:
            setError(
              "Invalid input: " +
                (err.response.data.Zoderror?.issues?.[0]?.message ||
                  "Please check your inputs")
            );
            break;
          case 403:
            setError(err.response.data.message);
            break;
          case 500:
            setError("Server error. Please try again later");
            break;
          default:
            setError("An error occurred. Please try again");
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection");
      } else {
        setError("An error occurred. Please try again");
      }
    })
  }
  return (
    <div className="bg-purple-700 w-screen h-screen flex items-center justify-center">
      <div className="bg-white p-[30px] flex flex-col items-center space-y-5 rounded-xl">
        <div className="flex space-x-4">
          <BrainIcon />
          <div className="font-bold text-[24px]">Second Brain</div>
        </div>
        <div className="font-bold text-[20px]">
          {props.sign} Page
        </div>
        <div className="flex items-center space-x-5">
          <div className="">UserName: </div>
          <Input type="search" size="md" value={username} onChange={(e)=>setUsername(e.target.value)} placeHolder="Enter your Name"/>
        </div>
        <div className="flex items-center space-x-5">
          <div className="">Password: </div>
          <Input type="password" size="md" value={password} onChange={(e)=>setPassword(e.target.value)} placeHolder="Enter password"/>
        </div>
        <Button text={props.sign} variant="primary" color="white" size="md" onClick={()=>{if(props.sign==="Sign Up")signUp();else signIn()}}/> 

        <div className="text-red-500">{error?"*"+error:null}</div>

        {props.sign==="Sign Up" ?<div className="text-blue">Already have an account <a href="/signin" className="underline text-sky-500">Signin</a></div>:<div className="text-blue">Don't have an account <a href="/signup" className="underline text-sky-500">Signup</a></div>}
      </div>
    </div>
  )
}
