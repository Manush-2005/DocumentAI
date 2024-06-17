"use client";
import { messages } from '@prisma/client';
import React from 'react'
import { cn } from '@/lib/utils'
import { MessageCircleOff } from "lucide-react";
import { useEffect,useState } from 'react';
import { LoaderPinwheel } from 'lucide-react';
import Markdown from 'react-markdown';


  

type Props = {
    messages: messages[];
}



const MessagesList = ({messages}: Props) => {
    const [isLoading, setIsLoading] = useState(false);


    useEffect(()=>{

        if(messages.length > 0){
        if (messages[messages.length - 1].role === 'user') {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }

    }
        
    },[messages]);
    
    if(!messages || messages.length === 0 ){
        return(
            <>
                <div className="flex flex-col items-center justify-center h-screen">
                <MessageCircleOff className="text-blue-500 h-12 w-12" />
                <p className="mt-4 text-xl text-gray-600">No messages yet</p>
            </div>
            
            </>
        )
    }

    return(
        <>

        <div className=' flex flex-col gap-2 px-4'>
      

        {messages.map((message,index)=>{
            const isLastUserMessage = index === messages.length - 1 && message.role === "user";
            return(
                
                <>



              
            
                <div key={message.messageid} className={cn("flex",{
                    "justify-end pl-10": message.role === "user",
                    "justify-start pr-10":message.role === "assistant"
                })}>



                    <div className={
                        cn("rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/100",{
                            "bg-blue-600 text-white": message.role ==="user"
                        })
                    }>
                        
                    <p>
                        <Markdown>
                        
                        {message.content}

                        </Markdown>
                        
                        </p>
                
                      
                        </div>

                       

                      
                    </div>

                    {isLoading && isLastUserMessage ? (
                    <div className='flex justify-start pr-10 rounded-lg px-3 text-sm py-3 shadow-md ring-1 ring-gray-900/100 mr-20 bottom-3'>
                        <p>
                        <LoaderPinwheel className="h-5 w-5 text-blue-500 animate-spin" />

                        </p>
                    </div>
                ) : null}
                    </>
            )
        })}


        </div>
        
        </>
    )

}

export default MessagesList;