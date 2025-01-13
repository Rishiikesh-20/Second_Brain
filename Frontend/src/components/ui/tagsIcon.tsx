import { sizeType } from "./Button"
interface TagsProps{
  size:sizeType,
  text:string
}
const paddingMap=new Map<sizeType,string>();
paddingMap.set("sm","px-[7px] py-[5px] rounded-2xl")
paddingMap.set("md","px-[12px] py-[3px] rounded-2xl")
paddingMap.set("lg","px-[14px] py-[5px] rounded-2xl")
export function TagsIcon(props:TagsProps){
  return (
    <div className={`${paddingMap.get(props.size)} bg-purple-300 text-purple-500 text-[12px]`}>
      #{props.text}
    </div>
  )
}