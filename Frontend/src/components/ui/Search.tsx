import { ChangeEvent } from "react";
import { sizeType } from "./Button"

interface SearchType{
  placeHolder?:string,
  size:sizeType,
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
  value:string
}
const SearchSizeMap=new Map<sizeType,string>();
SearchSizeMap.set("sm","px-[15px] py-[7px] rounded-2xl")
SearchSizeMap.set("md","px-[15px] py-[7px] rounded-2xl")
SearchSizeMap.set("lg","px-[45px] py-[40px] rounded-2xl")

export function Search(props:SearchType){
  return (
    <input type="search" className={`${SearchSizeMap.get(props.size)} border border-gray-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 `} placeholder={`${props.placeHolder}`} onChange={(e)=>props.onChange(e)} value={props.value}/>
  )
}