type tweetType={
  link:string
}
export function Tweet(props:tweetType){
  console.log("Cam inside tweet")
  let rem=props.link.split('x.com/')[1];
  const l=`https://twitter.com/${rem}`
  return (
    <blockquote className="twitter-tweet">
      <a href={l}></a> 
    </blockquote>   
  )
}