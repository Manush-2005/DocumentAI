// connecting gemini with edge
import { generateText, GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import { getcontext } from '../../../AIFunctions/context';
import { PrismaClient } from '@prisma/client';
import { getExcelcontext } from '@/AIFunctions/ExcelContext';

const client = new PrismaClient();

type message = {
  role: string,
  content: string
};



export async function POST(req:Request) {

  try {
    const {messages,chatId} = await req.json();
    const messages1 = (messages  as message[]);
    const lastmessage = messages1[messages1.length - 1];
    const lastmessagecontent = lastmessage.content;

    const currentchat = await client.chats.findFirst({
      where:{
        id:chatId
        
      }
    });
    const namespace = currentchat?.namespace;
    const filename = currentchat?.pdfName;

    if (filename && filename.includes('pdf')){
      const context = await getcontext(lastmessagecontent,namespace as string);
   
      const prompt = {
        role: "system",
        content: `You are the AI assistant and you have to answer this question.
        AI assistant is a brand new, powerful, human-like artificial intelligence.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
        AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
        
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
        AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
        AI assitant will use this CONTEXT along with the  your general Knowledge about various topics to answer the question. 
        If AI assistant does not answer then he replies "The avaliable information you are requesting is not avaliable in this document".
        AI assistant will not invent anything that is not drawn directly from the context.
        Question asked to AI is ${lastmessagecontent}
        Output your reply to this question based on the context.
        `,
    };
  
  
    console.log(context);
  
   
      
      const text = await streamText(
          {
              model: google("models/gemini-pro"),
              prompt :  prompt.content ,
                 
          }   
      );
  
      
  
      const answer = new StreamingTextResponse(text.toAIStream({
        onStart: async ()=>{
  
          await client.messages.create({
            data:{
              role: "user",
              content: lastmessagecontent,
              chatid: chatId,
            }
          });
  
       },
       onCompletion: async (answer) =>{
        await client.messages.create({
          data:{
            role: "assistant",
            content: answer,
            chatid: chatId,
          }
        });
       }
  
  
      }));
      
  
  
    
        return answer;

    }

    const context = await getExcelcontext(lastmessagecontent,namespace as string);
    const prompt = {
      role: "system",
      content: `You are the AI assistant and you have to answer this question.
      AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.

      
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK

      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      If AI assistant does not answer then he replies "The avaliable information you are requesting is not avaliable in this document".
      AI assistant will not invent anything that is not drawn directly from the context.
      AI assitant will use this CONTEXT along with the  your general Knowledge about various topics to answer the question. 
      Question asked to AI is ${lastmessagecontent}
      Output your reply to this question based on the context(Use bold text and points).

    

      `,
  };

   
    const text = await streamText(
      {
          model: google("models/gemini-1.5-flash-latest"),
          prompt :  prompt.content ,
             
      }   
  );

  

  const answer = new StreamingTextResponse(text.toAIStream({
    onStart: async ()=>{

      await client.messages.create({
        data:{
          role: "user",
          content: lastmessagecontent,
          chatid: chatId,
        }
      });

   },
   onCompletion: async (answer) =>{
    await client.messages.create({
      data:{
        role: "assistant",
        content: answer,
        chatid: chatId,
      }
    });
   }


  }));

    return answer;

    
   
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({"error":"error occured while generating text"});
    
  }
  
}