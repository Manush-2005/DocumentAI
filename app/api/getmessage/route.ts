import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const client = new PrismaClient();

export async function POST(req:Request){
    const {chatId} = await req.json();
    const messages = await client.messages.findMany({
        where:{
            chatid: chatId as string
        }
    });

    return NextResponse.json(messages);

}