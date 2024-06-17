
import { useState } from "react";
import { auth } from '@clerk/nextjs/server';
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Chatsidebar from "../../../components/Chatsidebar";
import Pdfviwer from "../../../components/Pdfviwer";
import ChatComponet from "../../../components/ChatComponet";
import ExcelViewer from "../../../components/ExcelViewer";

type Props = {
    params?: {
        chatId: string;
    };
};
const client = new PrismaClient();

const Chatpage = async ({params}:Props) =>{

 const chatId = params?.chatId;
const { userId } : { userId: string | null } = auth();
 


 
 const chats = await client.chats.findMany({
    where:{
        userId: userId as string
    }
 });

 const currentchat = chats.find(chat => chat.id === chatId);
 const currentchaturl = currentchat?.pdfurl;
 const currentchatname = currentchat?.pdfName;

 



    return(
        <>
        <div className="flex max-h-screen">
            <div className="flex w-full max-h-screen">


                <div className="flex-[2] max-w-xs">
                    <Chatsidebar chats={chats} chatId={chatId as string}  />

                
                </div>
                <div className="max-h-screen p-4 flex-[5] overflow-auto">
                {currentchatname && currentchatname.includes('xlsx') && <ExcelViewer excelUrl={currentchaturl as string} />}
                {currentchatname && currentchatname.includes('pdf') && <Pdfviwer pdf_url={ currentchaturl as string} />}
                    
                   
                    
                </div>
                <div className="flex-[3] border-l-4 border-l-slate-200 scrollbar-hide">
                    <ChatComponet chatId={chatId as string}/>
                </div>

            </div>



        </div>
       
        </>
    )

};

export default Chatpage;