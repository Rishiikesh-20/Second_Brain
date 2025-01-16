import { ReactElement } from "react"
import { ShareIcon } from "./ShareIcon"
import { DeleteIcon } from "./deleteIcon"
import { TagsIcon } from "./tagsIcon"
import { Youtube } from "./youtube"
import { Tweet } from "./tweet"
import { Document } from "./document"
import axios from "axios"
import { DB_URL } from "../DbUrl"
type contentType="document" | "youtube" | "tweet" | "link"
interface containerType{
  title:string,
  tags?:string[],
  typeIcon:ReactElement | null|undefined,
  date:string,
  contentType:contentType,
  content?:string,
  link?:string,
  id:string,
  Load:(id:any)=>void
}

const contentMap=new Map<contentType,ReactElement>();
export function Container(props:containerType){
  if(props.contentType==="youtube" && props.link){
    contentMap.set("youtube",<Youtube link={props.link}/>)
  }else if(props.contentType==="tweet" && props.link){
    console.log("Came inside tweetIf")
     contentMap.set("tweet",<Tweet link={props.link}/>)
  }else if(props.contentType==="document" && props.content){
    contentMap.set("document",<Document content={props.content}/>)
  }
  return(
    <div className="h-auto max-w-80 shadow-lg rounded-md flex flex-col p-[7px] space-y-4"> 
      <div className="flex flex-row justify-around items-center">

        {props.typeIcon ? <div className="mx-[10px]">{props.typeIcon}</div>:null}

        <div className="font-bold">
          {props.link ? <a href={`${props.link}`} className="no-underline hover:underline">{props.title}</a>:<div>{props.title}</div>}
        </div>

        <div className="flex space-x-4">
          <ShareIcon size="sm"/>
          <div onClick={async ()=>{
            const token=localStorage.getItem("token")
            try{
              const response=await axios.delete(`${DB_URL}api/v1/content`,{headers:{Authorization:"Bearer "+token},data:{contentId:props.id}})

              alert("Successful")
              props.Load(props.id);

            }catch(e:any){
              if(e.response.status===403){
                alert("Trying to delete a doc you don't own")
              }else{
                alert("Server error")
              }
            }
          }}>
            <DeleteIcon size="sm" />
          </div>
          
        </div> 

      </div>
      <div className="">
        {contentMap.get(props.contentType)}
      </div>

      <div className="space-y-3">
        {props.tags?<div className="flex gap-2 flex-wrap">
          {props.tags.map(t=>{
            return (
              <TagsIcon text={t} size="md"/>
            )
          })}
        </div>:null}
        <div className="text-gray-500 text-sm">Added on {props.date}</div>
      </div>
      
    </div>
  )
}
