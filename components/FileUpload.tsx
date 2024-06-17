"use client";

import React from 'react'
import { useDropzone } from 'react-dropzone';
import { Inbox,Loader2 } from 'lucide-react';
import storage from '@/app/firebase.config';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { metadata } from '@/app/layout';
import { useMutation } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';

type Props = {}

const FileUpload = () => {

    const [uploading,setuploading] = useState(false);


    const {mutate} = useMutation({
        mutationFn: async ({file_name, file_url,file_type} : {file_name: string, file_url: string,file_type:string}) => {

            const res = await axios.post("http://localhost:3000/api/createchat",{name:file_name,url:file_url,file_type:file_type});

            return res.data;
        }

    });
    const {getRootProps, getInputProps} = useDropzone({
        accept:{
            "application/pdf": [".pdf"],
            "application/.xlsx": [".xlsx"],
        },
        maxFiles:1,
        onDrop:async (acceptedfile)=>{
         
            const file = acceptedfile[0];
            if(file.size > 5 * 1024 * 1024){
                toast.error("File size should be less than 5MB");
                return;
            }


            const fileType = file.type;

            if(fileType === "application/pdf"){
              toast.success("PDF file selected");
              setuploading(true);


            

              // upload to firebase storage
  
             try {

              const fileref = ref(storage, file.name);
              const file_name = file.name;
              const file_type = file.type;
              await uploadBytes(fileref,file).then((snapshot)=>{
                console.log(snapshot);
  
                  
                  toast.success(" PDF File Uploaded Successfully");
              });
  
              let file_url;
  
              getDownloadURL(fileref).then((url)=>{
                  file_url = url;
  
                  // pdf url
                  
                  mutate({ file_name, file_url,file_type },{
                      onSuccess: (chatid) => {
                          setuploading(false);
                          toast.success("Redirecting to chat page...");
                          window.location.href = `/chat/${chatid.chatid}`;
                         
                          
                          
                      },
                      onError: (error) => {
                          toast.error("Error in creating the chat.Please try again.");
                          
                      }
                  
                  });
  
              });
              
             } catch (error) {

              console.log(error);
              toast.error("Error in uploading the PDF file.Please try again.");
              // window.location.reload();
              
             }
            }
            if(fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel'){
              toast.success("Excel file selected");
              setuploading(true);
              try {

                const fileref = ref(storage, file.name);
                const file_name = file.name;
                const file_type = file.type;
                 await uploadBytes(fileref,file).then((snapshot)=>{
                  console.log(snapshot);
    
                    
                    toast.success(" Excel File Uploaded Successfully");
                });
  
  
                let file_url;
  
                getDownloadURL(fileref).then((url)=>{
                    file_url = url;
  
                    // excel url
                  
                    console.log(file_url);
  
                    mutate({ file_name, file_url,file_type },{
                      onSuccess: (chatid) => {
                          setuploading(false);
                          toast.success("Redirecting to chat page...");
                          window.location.href = `/chat/${chatid.chatid}`;
                         console.log(chatid);
                          
                          
                      },
                      onError: (error) => {
                          toast.error("Error in creating the chat.Please try again.");

                          
                      }
                  
                  });
                    
                    });
                
              } catch (error) {

                toast.error("Error in uploading the Excel file.Please try again.");
                window.location.reload();
                
              }


                return;
            }


          
          
            
           
            
        }
    });



  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps(
           {className:"border-dashed border-2 rounded-xl cursor-pointer bg-grey-50 py-8 flex justify-center items-center flex-col"}
        )}>
            <input {...getInputProps()} />
         
            {uploading ? (
          <>
            {/* loading state */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Scanning Document ....
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF or Excel Here
              (Max 5MB)
            </p>
          </>
        )}



        </div>
    </div>
    
  )
}

export default FileUpload

