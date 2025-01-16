import { ReactElement } from "react"

interface horizontalType{
  icon:ReactElement,
  text:string
}
export function HorizontalComponent(props:horizontalType){
  return (
    <div className="flex space-x-5 cursor-pointer">
      {props.icon}
      <div className="font-bold">{props.text}</div>
    </div>
  )
}