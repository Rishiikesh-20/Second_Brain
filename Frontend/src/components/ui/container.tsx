import { ReactElement } from "react"
import { ShareIcon } from "./ShareIcon"
import { DeleteIcon } from "./deleteIcon"
import { TagsIcon } from "./tagsIcon"
import { Youtube } from "./youtube"
import { Tweet } from "./tweet"
import { Document } from "./document"
type contentType="document" | "youtube" | "tweet" | "link"
interface containerType{
  title:string,
  tags?:string[],
  typeIcon:ReactElement,
  date:string,
  contentType:contentType,
  content?:string,
  link?:string,
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
          <DeleteIcon size="sm" />
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
//Content database addition
//1.date
//2.link should be optional
//3.content should be added as optional
