import { BrainIcon } from "./ui/brainIcon";
import { DocumentIcon } from "./ui/documentIcon";
import { HorizontalComponent } from "./ui/horizontalComponent";
import { TagIcon } from "./ui/tagIcon";
import { TweetIcon } from "./ui/tweetIcon";
import { YoutubeIcon } from "./ui/youtubeIcon";

export function SideBar(){
  return (
    <div className="h-full w-full border-r-[1px] border-gray-500 border-opacity-35 flex flex-col pr-[50px] pl-[20px] pt-[20px] space-y-10">
      <div className="flex space-x-4">
        <BrainIcon />
        <div className="font-bold text-[24px]">Second Brain</div>
      </div>
      <div className="flex flex-col space-y-9">
        <HorizontalComponent icon={<TweetIcon />} text={"Tweets"}/>
        <HorizontalComponent icon={<YoutubeIcon />} text={"Youtube"}/>
        <HorizontalComponent icon={<DocumentIcon size="md" />} text={"Document"}/>
        <HorizontalComponent icon={<TagIcon />} text={"Tags"}/>
      </div>
    </div>
  )
}