import { useEffect } from "react";

type tweetType={
  link:string
}
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

export function Tweet(props:tweetType){
  useEffect(() => {
    // Ensure the Twitter script is loaded before calling `twttr.widgets.load()`

    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    }
  }, [props.link]);
  console.log("Cam inside tweet")
  let rem=props.link.split('x.com/')[1];
  const l=`https://twitter.com/${rem}`
  return (
    <blockquote className="twitter-tweet">
      <a href={l}></a> 
    </blockquote>   
  )
}