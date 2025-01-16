import { AllIcon } from "./ui/AllIcon";
import { BrainIcon } from "./ui/brainIcon";
import { DocumentIcon } from "./ui/documentIcon";
import { HorizontalComponent } from "./ui/horizontalComponent";
import { TagIcon } from "./ui/tagIcon";
import { TweetIcon } from "./ui/tweetIcon";
import { YoutubeIcon } from "./ui/youtubeIcon";
interface sideBarType{
  changeVariant:(va:string)=>void
}
export function SideBar(props:sideBarType){
  return (
    <div className="h-full w-full border-r-[1px] border-gray-500 border-opacity-35 flex flex-col pr-[50px] pl-[20px] pt-[20px] space-y-10">
      <div className="flex space-x-4">
        <BrainIcon />
        <div className="font-bold text-[24px]">Second Brain</div>
      </div>
      <div className="flex flex-col space-y-9">
      <div onClick={()=>props.changeVariant("All")}><HorizontalComponent icon={<AllIcon />} text={"All"}/></div>
        <div onClick={()=>props.changeVariant("tweet")}><HorizontalComponent icon={<TweetIcon />} text={"Tweets"}/></div>
        <div onClick={()=>props.changeVariant("youtube")}><HorizontalComponent icon={<YoutubeIcon />} text={"Youtube"}/></div>
        <div onClick={()=>props.changeVariant("document")}><HorizontalComponent icon={<DocumentIcon size="md" />} text={"Document"}/></div>
        <div><HorizontalComponent icon={<TagIcon />} text={"Tags"}/></div>
      </div>
    </div>
  )
}