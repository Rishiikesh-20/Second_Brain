import { ReactElement, useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { PlusIcon } from './ui/plusIcon'
import { ShareIcon } from './ui/ShareIcon'
import { Container } from './ui/container'
import { DocumentIcon } from './ui/documentIcon'
import { TweetIcon } from './ui/tweetIcon'
import { YoutubeIcon } from './ui/youtubeIcon'
import { SideBar } from './sideBar'
import { AddContent } from './AddContent'
import axios from 'axios'
import { DB_URL } from './DbUrl'
import { ShareUrl } from './ShareUrl'
import { Front_URL } from './FrontEndUrl'
export function Body(){
    const [isPopUp,setPopUp]=useState(false);
    const [sharePopup,setSharePopUp]=useState(false);
    const [shareLink,setShareLink]=useState("");
    const [contents,setContents]=useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [variant,setVariant]=useState("All")
    const [filteredContent,setFilteredContent]=useState<any[]>([])
    function onClose(){
      setPopUp(false);
    }
    function Load(id:any){
      setContents(c=>(c.filter(content=>content._id!=id)))
    }
    type variantType="youtube" | "document" | "tweet" | "link";
    const IconVariant=new Map<variantType,ReactElement>();
    IconVariant.set("youtube",<YoutubeIcon />)
    IconVariant.set("document",<DocumentIcon size="md"/>)
    IconVariant.set("tweet",<TweetIcon />)
    useEffect(()=>{
      const fetchContent = async () => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${DB_URL}api/v1/content`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data)
            setContents(response.data.content);
        } catch (e: any) {
            setError(e.response?.status === 500 
                ? "Server error occurred" 
                : "Failed to fetch content"
            );
            setContents([]);
        } finally {
            setIsLoading(false);
        }
    };
    fetchContent();
    },[isPopUp])

    useEffect(() => {
      setIsLoading(true);
      if (variant === "youtube" || variant === "tweet" || variant === "document") {
        setFilteredContent(contents.filter((c) => c.type === variant));
      } else if (variant === "All") {
        setFilteredContent(contents); 
      }
      setIsLoading(false)
    }, [variant, contents]);

    async function shareBrain(){
      setSharePopUp(true);
      setIsLoading(true);
      try{
        const token=localStorage.getItem("token");
        const response=await axios.post(DB_URL+"api/v1/brain/share",{share:"true"},{headers:{
          Authorization:"Bearer "+token
        }});
        console.log(response.data.link)
        const link=`${Front_URL}share/${response.data.link}`;
        setIsLoading(false);
        setShareLink(link);
      }catch(e:any){
        if(e.response.status===403){
          alert("Status was not true");
        }else{
          alert("Server Error");
        }
      }
    }
    function changeVariant(va:string){
      setVariant(va);
    }
    function onShareClose(){
      setSharePopUp(false);
      setIsLoading(false);
    }
  return (
      <div className="relative w-full h-full">
        <div className="fixed right-14 bottom-12 bg-purple-500 w-[45px] h-[45px] rounded-[22px] flex items-center justify-center text-white cursor-pointer" onClick={()=>setPopUp(true)}>
          <PlusIcon size="lg"/>
        </div>
        {isPopUp && <AddContent onClose={()=>setPopUp(false)}/>}
        {sharePopup && <ShareUrl isLoading={isLoading} link={shareLink} onShareClose={onShareClose}/>}
        <div className="flex min-h-screen">
          <div className=" hidden md:block w-[200px] h-screen lg:w-[280px]">
            <SideBar changeVariant={changeVariant}/>
          </div>
          <div className="ml-[10px]  sm:p-6 flex-1  ml-[0px] ">
            <div className="flex justify-center items-center md:justify-between mb-[20px]">
              <div className="font-bold text-[26px]">
                All Notes
              </div>
              <div className=" hidden md:flex space-x-4 ">
                <Button text="Share Brain" variant="secondary" color="purple-500" size="md" startIcon={<ShareIcon size="md" />} onClick={()=>{shareBrain()}}/>

                <Button text="Add Content" variant="primary" color="white" size="md" startIcon={<PlusIcon size="md" />} onClick={()=>{setPopUp(true)}}/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
                {isLoading ? (
                      <div>Loading...</div>
                  ) : error ? (
                      <div>Error: {error}</div>
                  ) : filteredContent.length === 0 ? (
                      <div>No content available</div>
                  ) : (
                    filteredContent.map((content, index) => (
                      <div key={index}>
                          <Container Load={Load}
                              id={content._id}
                              title={content.title}
                              typeIcon={IconVariant.get(content.type) || null}
                              tags={content.tags}
                              date={content.date}
                              contentType={content.type}
                              link={content.link}
                              content={content.content?content.content:""}
                          />
                      </div>
                    ))
                  )}
            </div>
          </div>
        </div>
      </div>
  )
}