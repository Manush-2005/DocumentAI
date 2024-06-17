"use client";
import React, { useState } from 'react'
import Link from 'next/link';
import { MessageCircle, PlusCircle,CircleX,ArrowLeftIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import axios from 'axios';
import FileUpload from './FileUpload';
import { Spinner } from './Loader';





type Props = {
    chats: chats[];
    chatId: string;
}

const Chatsidebar = ({chats,chatId}: Props) => {
  const [isLoading,setisLoading] = useState(false);

  if(isLoading){
    return  (
    
     
   
      <div className='w-full h-screen p-4 text-gray-200 bg-gray-900'>
       
       <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%', // This will make the div take up the full height of its parent
      width: '100%' // This will make the div take up the full width of its parent
    }} className='flex-col'>
      <Spinner className='text-gray-200' />
      <p>We are deleting this chat...</p>
    </div>
      
      </div>
    
    
    
    )
  }
 





  return (





    <div className='w-full h-screen p-4 text-gray-200 bg-gray-900'>

      
<Dialog>
        <DialogTrigger asChild>
        <Button>
            <PlusCircle className='mr-2 w-4 h-4' />
            New Chat
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>DocumentAI</DialogTitle>
            <DialogDescription>
              Select the file you want to chat with.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
           

              <FileUpload/>
            
            
          
          </div>
        </DialogContent>
      </Dialog>

        
       
        
            
            

            <div className=' flex flex-col gap-2 mt-4'>
              {chats.length === 0 && <div className="flex flex-col items-center justify-center h-screen ">
                <MessageCircle className="text-blue-500 h-12 w-12" />
                <p className="mt-3 text-xl text-gray-600">No chats avaliable</p>
            </div>}
          
              {chats.map((chat)=>{
                return (
                  
                  <Link key={chat.id} href={`/chat/${chat.id}`}>
                  <div className={
                    cn("rounded-lg p-3 text-slate-300 flex items-center",{
                      "bg-blue-600": chat.id === chatId,
                      "hover:text-white": chat.id !== chatId
                    })
                  }>
                    <MessageCircle className='mr-2' />
                    <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.pdfName}</p>
                  
                    <Dialog>
  <DialogTrigger>
    <CircleX className='w-4 h-4' />


  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Chat</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete this conversation.
      </DialogDescription>
      <div className='flex gap-2 mt-4 justify-end'>
        <Button onClick={async ()=>{

          setisLoading(true);
          
          const res = await axios.post(`http://localhost:3000/api/deletechat`,{

            chatId: chatId as string
          });
          console.log(res.data);
          if(res.data.message === 'Chat Deleted Successfully'){
          
            window.location.reload();
            setisLoading(false);
          }
        }}>
          Delete
        </Button>
        </div>
    </DialogHeader>
  </DialogContent>
</Dialog>


                  </div>
                  </Link>
                  
                )
              })}



<Button variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left"className='bg-white-500' >
<Link href="/">
Back to HomePage
</Link>


</Button>





            </div>

            <div className='absolute bottom-4 left-22 '>
            
 

              <div className='flex items-center gap-3 text-sm text-slate-500 flex-wrap '>
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>Source</Link>
              </div>


            </div>
    </div>
  )
};

export default Chatsidebar;