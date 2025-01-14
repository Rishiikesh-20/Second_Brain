import { sizeType } from "./Button"
const crossMap=new Map<sizeType,string>()
crossMap.set("sm","w-[10px] h-[10px]")
crossMap.set("md","w-[16px] h-[16px]")
crossMap.set("lg","w-[24px] h-[24px]")
interface CrossType{
  size:sizeType
}
export function CrossIcon(props:CrossType){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`${crossMap.get(props.size)}`}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}