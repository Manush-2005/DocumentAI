
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignInButton,SignedIn,SignedOut,UserButton } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { Sign } from "crypto";
import {  LogIn,ArrowRightIcon } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FeatureSection from "@/components/Featuresection";
import toast from "react-hot-toast";
import { Spinner } from "@/components/Loader";
import React, { useState,useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";
import IconSectionDescriptionOnLeftIconBlocksOnRight from "@/components/Steeper";




export default async function Home() {


  

  let getchatid;

  const { userId } : { userId: string | null } = auth();

  if(userId){
    try {
      const client = new PrismaClient();

      const fristchat = await client.chats.findFirst({
        where:{
          userId:userId
        }
      });
      const chatid = fristchat?.id;
      getchatid = chatid;
      
    } catch (error) {
      toast.error("Database is down");
      
    }
  }
  else{
    getchatid = null;
  }


  


  // if(isLoading){

  //   return (
   
  //     <div className='w-full h-screen p-4'>
       
  //     <div style={{
  //    display: 'flex',
  //    justifyContent: 'center',
  //    alignItems: 'center',
  //    height: '100%', // This will make the div take up the full height of its parent
  //    width: '100%' // This will make the div take up the full width of its parent
  //  }} className='flex-col'>
  //    <Spinner  />
  //   <p> Loading DocumentAI ....</p>
  //  </div>
     
  //    </div>
  
  //   );

  // };


  

  return (
   <>
   

<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
   <div className="w-screen min-h-screen">
   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center">
        <h1 className="mr-3 text-5xl font-semibold">Chat with any Document</h1>
        <div className="h-10 w-10">
        <UserButton afterSignOutUrl="/"/>
        </div>
      </div>
      <div className="flex mt-2">
        <SignedIn>
        {getchatid ? (
    <Link href={`/chat/${getchatid}`}>
     <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right">
Go to Your Chats
</Button>
    </Link>
  ) : (
    <>
    
    </>
  )}
        </SignedIn>
       
      </div>

      <p className="max-w-xl mt-1 text-lg text-slate-800 ">
        DocumentAI is a platform that allows you to chat with any document. You can upload a document and chat with it as if it were a person.
      </p>

      <div className="w-full mt-4">

        <SignedIn>
          <FileUpload/>



        </SignedIn>

        <SignedOut>

          <Button>
            <SignInButton>Login to get Started!
              

             
            </SignInButton>
          </Button>
          

          </SignedOut>


      </div>
 
    </div>
   
    </div>
    

   </div>
   
   <IconSectionDescriptionOnLeftIconBlocksOnRight/>
   <FeatureSection/>
   
   </div>

   

   
   
   
   </>
    
  );
}
