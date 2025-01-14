import { useState } from 'react'
import { Button } from './ui/Button'
import { PlusIcon } from './ui/plusIcon'
import { ShareIcon } from './ui/ShareIcon'
import { Container } from './ui/container'
import { DocumentIcon } from './ui/documentIcon'
import { TweetIcon } from './ui/tweetIcon'
import { YoutubeIcon } from './ui/youtubeIcon'
import { Youtube } from './ui/youtube'
import { SideBar } from './sideBar'
import { AddContent } from './AddContent'

export function Body(){
  const [isPopUp,setPopUp]=useState(false);
    const D=new Date();
    let date=D.getDate();
    let month=D.getMonth()+1;
    let year=D.getFullYear();
    let totalDate=date+"/"+month+"/"+year
    function onClose(){
      setPopUp(false);
    }
  return (
      <div className="relative w-full h-full">
        <div className="fixed right-14 bottom-12 bg-purple-500 w-[45px] h-[45px] rounded-[22px] flex items-center justify-center text-white cursor-pointer" onClick={()=>setPopUp(true)}>
          <PlusIcon size="lg"/>
        </div>
        {isPopUp && <AddContent onClose={()=>setPopUp(false)}/>}
        <div className="flex min-h-screen">
          <div className=" hidden md:block w-[200px] h-screen lg:w-[280px]">
            <SideBar />
          </div>
          <div className="ml-[10px]  sm:p-6 flex-1  ml-[0px] ">
            <div className="flex justify-center items-center md:justify-between mb-[20px]">
              <div className="font-bold text-[26px]">
                All Notes
              </div>
              <div className=" hidden md:flex space-x-4 ">
                <Button text="Share Brain" variant="secondary" color="purple-500" size="md" startIcon={<ShareIcon size="md" />} onClick={()=>{}}/>

                <Button text="Add Content" variant="primary" color="white" size="md" startIcon={<PlusIcon size="md" />} onClick={()=>{}}/>
              </div>
            </div>

            <div className="ml-[80px]  grid grid-cols-1 space-y-5 md:grid-cols-1 ml-[0px] gap-4 xl:grid-cols-3 ">
              <div>
                <Container title="Project Ideas my name is rishhieksh , how are you" typeIcon={<YoutubeIcon />} tags={["productivity","ideas","politics"]} date={totalDate} contentType='youtube' link="https://www.youtube.com/watch?v=Embp4LK1dnI"/>
              </div>
              <div>
                <Container title="switzerland tour" typeIcon={<TweetIcon />} tags={["productivity","ideas","politics"]}
                date={totalDate} contentType='tweet' link="https://x.com/rishiikeshsk/status/1816869555253444942" />
              </div>
              <div>
                <Container title="Notes" typeIcon={<DocumentIcon size='md'/>} tags={["productivity","ideas","politics"]} date={totalDate} contentType='document' content="Hi everyone, my name is rishiikesh , i want to study Next js" />
              </div> 
              <div>
                <Container title="Notes" typeIcon={<DocumentIcon size='md'/>} tags={["productivity","ideas","politics"]} date={totalDate} contentType='document' content="Hi everyone, my name is rishiikesh , i want to study Next js" />
              </div> 
              <div>
                <Container title="Notes" typeIcon={<DocumentIcon size='md'/>} tags={["productivity","ideas","politics"]} date={totalDate} contentType='document' content="Hi everyone, my name is rishiikesh , i want to study Next js" />
              </div> 
              <div>
                <Container title="Notes" typeIcon={<DocumentIcon size='md'/>} tags={["productivity","ideas","politics"]} date={totalDate} contentType='document' content="Hi everyone, my name is rishiikesh , i want to study Next js" />
              </div> 
            </div>
          </div>
        </div>
      </div>
  )
}