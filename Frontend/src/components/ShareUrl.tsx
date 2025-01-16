import { useState } from "react";
import { CopyIcon } from "./ui/copyIcon";
import { CrossIcon } from "./ui/CrossIcon";

interface ShareUrlType{
  isLoading:Boolean
  link:string;
  onShareClose:()=>void
}
export function ShareUrl(props:ShareUrlType){
  const [isPopUp,setPopup]=useState(false);
  function popUp(){
    setPopup(true);
    setTimeout(()=>setPopup(false),2000);
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative">
        <div className="absolute right-5 top-4 cursor-pointer" onClick={props.onShareClose}>
                    <CrossIcon size="lg"/>
        </div>
        {isPopUp &&<div className="fixed   bg-gray-500 py-[10px] px-[30px] rounded-2xl opacity-70 transition bottom-[200px] left-[680px] text-white">
          Copied...
        </div>}
        <div className="bg-white p-[50px] rounded-xl shadow-xl flex flex-col space-y-6 ">
          {props.isLoading?<div>
            Loading...
          </div>:<div className="flex flex-col p-[30px]">
              <div>Copy Url</div>
              <div className="flex items-center space-x-5">
                <div className="padding-[10px] bg-gray-300 border-[1px] border-black overflow-x-auto">
                <p>{props.link}</p>
                </div>
                <div className="cursor-pointer" onClick={()=>{
                  navigator.clipboard.writeText(props.link)
                  popUp()
                }}> 
                  <CopyIcon/>
                </div>

              </div>
              
            </div>}
        </div>
      </div>
    </div>
  )
}