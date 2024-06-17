import { NextRequest,NextResponse } from "next/server";
import { URLtoPDFObject } from "@/AIFunctions/Pdffunction";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";
import { URLtoExcelObject } from "../../../AIFunctions/Excelfunction";

const client = new PrismaClient();
export async function POST(req: NextRequest,res : NextResponse) {
   const { userId } = getAuth(req);

   if (!userId) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
   const {name,url,file_type} = await req.json();

   if(file_type === "application/pdf"){
   const {number,namespace} = await URLtoPDFObject(url);

   if(number === 0){
    return NextResponse.json({error:"Error in processing the pdf file"});
   }
   if (number === 1){
      const chat = await client.chats.create({
         data:{
             pdfName:name,
             pdfurl:url,
             userId:userId,
             namespace:namespace
         }
        });

        return NextResponse.json({chatid: chat.id});

   }
}

if(file_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file_type === 'application/vnd.ms-excel'){

   const {number,namespace} = await URLtoExcelObject(url);

   if(number === 0){
    return NextResponse.json({error:"Error in processing the excel file"});
   }

   if (number === 1){

      const chat = await client.chats.create({
         data:{
             pdfName:name,
             pdfurl:url,
             userId:userId,
             namespace:namespace
         }
        });

        return NextResponse.json({chatid: chat.id});
   }

  

  

};


  
return NextResponse.json({error:"Big Error"});
    
    
   } catch (error) {

    return NextResponse.json({error:error});
    
   }



  
};