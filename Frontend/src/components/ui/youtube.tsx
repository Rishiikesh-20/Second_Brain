interface youtubeType{
  link:string
}
export function Youtube(props:youtubeType){
  const index=props.link.indexOf('=');

  return(

     <iframe className="w-full" src={`https://www.youtube.com/embed/${props.link.substring(index+1)}?si=qX6KtYyXz17oEnFd`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
  )
}

//http://img.youtube.com/vi/0BjlBnfHcHM/maxresdefault.jpg