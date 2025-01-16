import { ChangeEvent } from "react";
import { sizeType } from "./Button"

interface InputType{
  placeHolder?:string,
  size:sizeType,
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
  value:string,
  type?:string
}
const InputSizeMap=new Map<sizeType,string>();
InputSizeMap.set("sm","px-[15px] py-[7px] rounded-2xl")
InputSizeMap.set("md","px-[15px] py-[7px] rounded-2xl")
InputSizeMap.set("lg","px-[45px] py-[40px] rounded-2xl")

export function Input(props:InputType){
  return (
    <input type={props.type? props.type:"search"} className={`${InputSizeMap.get(props.size)} border border-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 `} placeholder={`${props.placeHolder}`} onChange={(e)=>props.onChange(e)} value={props.value}/>
  )
}