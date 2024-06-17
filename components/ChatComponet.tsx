"use client";
import React, { useEffect,useState } from 'react'
import { Input } from './ui/input';
import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import MessagesList from './MessagesList';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AutosizeTextarea } from './AutosizeTextInput';


type Props = {
  chatId: string
}

const ChatComponet = ({chatId}: Props) => {

  const [chatLoaded, setChatLoaded] = useState(true);

  const {data} = useQuery({
    queryKey: ["chat",chatId],
    queryFn: async () => {
      const res = await axios.post(`http://localhost:3000/api/getmessage`,{
        chatId: chatId as string
      });

      

      return res.data;
    },

    enabled: chatLoaded
  })


    const {input,handleInputChange,handleSubmit,messages}= useChat({
        api: '/api/chat',
        body: {
          chatId: chatId
        },

        initialMessages: data || [],
        onFinish: () => setChatLoaded(false),
      
    });


    useEffect(()=>{
      const messagecontainer = document.getElementById("message-container");
      if(messagecontainer){
        messagecontainer.scrollTo({
          top: messagecontainer.scrollHeight,
          behavior:"smooth"
        })
      }
     
    },[messages]);
 

    
   
  return (
    
    <div className='flex flex-col h-screen'>
    <div className='overflow-auto scrollbar-hide flex-grow' id='message-container'>
      <div className='sticky top-0 inset-x-0 p-2 bg-white h-fit'>
        <h3 className='text-xl font-bold'> Chat</h3>
      </div>
      {/* @ts-ignore */}
      <MessagesList messages={messages}/>
    </div>

    <form onSubmit={handleSubmit} className='px-2 py-4 bg-white'>
      <div className='flex'>
       <AutosizeTextarea value={input} onChange={handleInputChange} placeholder='Ask any question ....' className='w-full'/>
        <Button className='bg-blue-600 ml-2'>
          <Send className='h-4 w-4'/>
        </Button>
      </div>
    </form>
  </div>
  
  )
}

export default ChatComponet;