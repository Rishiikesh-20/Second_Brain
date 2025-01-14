import { useState } from 'react'
import { Button } from './components/ui/Button'
import { PlusIcon } from './components/ui/plusIcon'
import { ShareIcon } from './components/ui/ShareIcon'
import { Container } from './components/ui/container'
import { DocumentIcon } from './components/ui/documentIcon'
import { TweetIcon } from './components/ui/tweetIcon'
import { YoutubeIcon } from './components/ui/youtubeIcon'
import { Youtube } from './components/ui/youtube'
import { SideBar } from './components/sideBar'
function App() {
  const [count, setCount] = useState(0)
  const D=new Date();
  let date=D.getDate();
  let month=D.getMonth()+1;
  let year=D.getFullYear();
  let totalDate=date+"/"+month+"/"+year
  return (
    <div>
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
              date={totalDate} contentType='tweet' link="https://x.com/Parul_Gautam7/status/1878041134884082051" />
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
      
      {/* <Button text="Add Content" variant="primary" color='white' size="sm" onClick={()=>{}} startIcon={<PlusIcon size="md"/>}/>

      <Button text="Share brain" variant="secondary" color='purple-500' size="sm" onClick={()=>{}} startIcon={<ShareIcon size="sm" />}  />

      <Button text="Add color" variant="primary" color='purple-500' size="sm" onClick={()=>{}}/> */}
      
      {/* <Container title="Project Ideas my name is rishhieksh , how are you" typeIcon={<YoutubeIcon />} tags={["productivity","ideas","politics"]} date={totalDate} contentType='youtube' link="https://www.youtube.com/watch?v=Embp4LK1dnI"/>

      <Container title="switzerland tour" typeIcon={<TweetIcon />} tags={["productivity","ideas","politics"]}
      date={totalDate} contentType='tweet' link="https://x.com/Parul_Gautam7/status/1878041134884082051" />

      <Container title="Notes" typeIcon={<DocumentIcon size='md'/>} tags={["productivity","ideas","politics"]} date={totalDate} contentType='document' content="Hi everyone, my name is rishiikesh , i want to study Next js" /> */}
      </div>
    </div>
  )
}

export default App
