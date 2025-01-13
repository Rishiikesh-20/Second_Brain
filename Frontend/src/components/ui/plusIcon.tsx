import { sizeType } from "./Button";
import { sizeMap } from "./size";
type plusType={
  size:"sm"|"md"|"lg"
}


export function PlusIcon(props:plusType){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${sizeMap.get(props.size)}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
  )
}