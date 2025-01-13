type documentType={
  content:string
}
export function Document(props:documentType){
  return <p>{props.content}</p>
}