import { ReactElement } from "react"
type variantType="primary" | "secondary";
export type sizeType="sm"|"md"|"lg";
interface ButtonProps{
  text:string,
  variant:variantType ,
  color:string,
  startIcon?:ReactElement,
  endIcon?:ReactElement,
  size:sizeType,
  onClick:()=>void
}

const variantMap=new Map<variantType,string>();
variantMap.set("primary","bg-purple-700 ");
variantMap.set("secondary","bg-purple-300");

const sizeMap=new Map<sizeType,string>();
sizeMap.set("sm","px-[10px] py-[7px] rounded-md")
sizeMap.set("md","px-[16px] py-[12px] rounded-md")
sizeMap.set("lg","px-[24px] py-[18px] rounded-lg")

const colorMap = new Map<string, string>();
colorMap.set("white", "text-white");
colorMap.set("purple-500", "text-purple-500");

export function Button(props:ButtonProps){
  return (
    <button className={`flex items-center justify-center ${variantMap.get(props.variant)} ${sizeMap.get(props.size)} ${colorMap.get(props.color)}`}>{props.startIcon? <div className="mr-[10px] "> {props.startIcon}</div>:null} <div>{props.text} </div>{props.endIcon ? <div className="ml-[10px]">{props.endIcon}</div>:null}
    </button>
  )
}