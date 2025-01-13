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
     <div className="flex">
      <div className="fixed left-0 top-2 h-full">
        <SideBar />
      </div>
      <div className="pl-[20px] flex flex-col ml-[280px] ">
        <div className="flex items-center space-between">
          <div className="font-bold text-[26px]">
            All Notes
          </div>
          <div className=" flex space-x-4">
            <Button text="Share Brain" variant="secondary" color="purple-500" size="md" startIcon={<ShareIcon size="md" />} onClick={()=>{}}/>

            <Button text="Add Content" variant="primary" color="white" size="md" startIcon={<PlusIcon size="md" />} onClick={()=>{}}/>
          </div>
        </div>

        <div>
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
  )
}

export default App
