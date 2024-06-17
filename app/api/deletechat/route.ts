import {index} from "../../../AIFunctions/pinecone";
import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Index } from "@pinecone-database/pinecone";

const prisma = new PrismaClient();


export const POST = async (req: NextRequest) => {

    const { chatId }  = await req.json();

    const chat = await prisma.chats.findUnique({

        where:{
            id: chatId
        }
    });


    const namespace = chat?.namespace as string;
    
    await index.namespace(namespace).deleteAll();
    await prisma.messages.deleteMany({
        where:{
            chatid: chatId
        }
    });


    await prisma.chats.delete({

        where:{
            id: chatId
        }
    });



    return NextResponse.json({message: 'Chat Deleted Successfully'});
};