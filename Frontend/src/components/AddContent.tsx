import { useEffect, useState } from "react";
import { Search } from "./ui/Search";
import { Button } from "./ui/Button";
import { TagsIcon } from "./ui/tagsIcon";
import { CrossIcon } from "./ui/CrossIcon";
import { DB_URL } from "./DbUrl";
import axios from "axios";
interface addContentType{
  onClose:()=>void
}
interface tagObject{
  id:number,
  tag:string
}
let nextId=0;
export function AddContent(props:addContentType){
  const [isChange,setChange]=useState("Document");
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [link,setLink]=useState("");
  const [currentTag,setCurrentTag]=useState<string>("");
  const [tags,setTag]=useState<tagObject[]>([]);
  console.log(tags);
  function addTag(){
    setTag([...tags,{id:nextId++,tag:currentTag}]);
    setCurrentTag("");
  }
  function deleteTag(id:number){
    setTag(tags.filter(t=>t.id!==id))
  }
  async function addToBrain(){
    let variant=isChange.toLowerCase();
    let obj={};
    if(variant==="document"){
      obj={
        type:variant,
        title:title.trim(),
        content:content.trim()
      }
      if(link){
        obj={
          ...obj,
          link
        }
      }
    }else if(variant==="youtube" || variant==="tweet"){
      obj={
        type:variant,
        title:title.trim(),
        link:link.trim(),
      }
    }if(tags){
      obj={
        ...obj,
        tags:tags.map(t=>t.tag)
      }
    }
    console.log(obj)
    const token=localStorage.getItem("token")
    try{
      const response=await axios.post(DB_URL+"api/v1/content",obj,{headers:{'Authorization':"Bearer "+token,'Content-Type': 'application/json'}});
      alert("Successful")
      props.onClose();

    }catch(e:any){
      if(e.response.status===411){
        alert("Inputs are wrong");
      }else if(e.response.status===500){
        alert("Server Error")
      }
    }

  }
  return(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="relative">
          <div className="absolute right-5 top-4 cursor-pointer" onClick={props.onClose}>
            <CrossIcon size="lg"/>
          </div>
        <div className="bg-white p-[50px] rounded-xl shadow-xl flex flex-col space-y-6 ">
            <div className="text-center font-bold">
              Add Content
            </div>
            <div className="space-x-5">
              <div className="inline font-bold text-sky-900">
                1. Content type: 
              </div>
              <select className="bg-sky-500 p-[10px] rounded-md" onChange={e=>setChange(e.target.value)}>
                <option value="Document">Document</option>
                <option value="Youtube">Youtube</option>
                <option value="Tweet">Tweet</option>
              </select>
            </div>
            <div className="space-x-4">
              <div className="inline font-bold text-sky-900">
                2. Title:
              </div> 
              <Search size="sm" placeHolder={`Enter ${isChange} Title`} onChange={(e)=>setTitle(e.target.value)} value={title}/>
            </div>
            {isChange==="Document"?<div className="space-x-5">
              <div className="inline font-bold text-sky-900">
                3.Content:  
              </div>
              <textarea className="border border-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 w-full h-[100px]" value={content} onChange={(e)=>setContent(e.target.value)} ></textarea>
            </div>:null}
            <div className="space-x-5 flex items-center ">
              <div className="inline font-bold text-sky-900 flex">
              {isChange==="Document"? <div className="">4</div>:<div className="mr-[4px]">3 </div>} .Link : 
              </div>
              <div className="">
                <Search size="md" value={link} onChange={(e)=>setLink(e.target.value)} placeHolder={`Enter ${isChange} Link `}/>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex space-x-5 items-center">
                <div className="font-bold text-sky-900 flex inline">
                {isChange==="Document"? <div className="inline">5</div>:<div className="inline mr-[4px]">4 </div>}.Tags : 
                </div>
                <Search size="md" value={currentTag} onChange={(e)=>setCurrentTag(e.target.value)} placeHolder="Enter the Tag"/>
                <Button text="Add" size="sm" variant="primary" color="purple-700" onClick={()=>addTag()}/>
              </div>
                {tags.length>0 ? <div className="flex ">
                {tags.map(t=>(
                  <div className="relative mr-[10px]">
                    <TagsIcon size="lg" text={t.tag}/>
                    <div className="absolute right-1 top-1 flex items-center">
                      <div className="bg-gray-500 p-[1px] rounded-2xl cursor-pointer" onClick={()=>deleteTag(t.id)}>
                        <CrossIcon size="sm" />
                      </div>
                    </div>
                  </div>
                  ))}
                </div>:null}
            </div>

            <div className="">
              <Button text="Add to the brain" size="lg" variant="primary" color="white" onClick={addToBrain} />
            </div>
            
        </div>
      </div>
      
    </div>
  )
  
}