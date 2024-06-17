import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import {Document,RecursiveCharacterTextSplitter} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./Embeddings";
import md5 from "md5";
import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import {index} from "./pinecone";
import { v4 as uuidv4 } from 'uuid';



type PDFPage = {
    pageContent: string,
    metadata:{
        pdf:{
            version:string,
            info:Object,
            metadata:Object,
            totalPages:number

        },
        loc:{
            pageNumber:number,
        }

    }

}


export const trucateStringBybytes = ( str:string, bytes:number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0,bytes));


};


async function getEmbedeDocument(doc:Document){
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
        id:hash,
        values:embeddings,
        metadata:{
            text:doc.metadata.text,
            pageNumber:doc.metadata.pageNumber
        }

    } ;
    
}



async function prepareDocument(page:PDFPage){

    let {pageContent,metadata} = page;
    pageContent = pageContent.replace(/\n/g, "");

    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata:{
                pageNumber:metadata.loc.pageNumber,
                text: trucateStringBybytes(pageContent,36000)

            }
        })
    ]);
   


    return docs;

}







export async function URLtoPDFObject(url : string) {


    // getting the pdf pages from the url
    const response = await fetch(url);
    const data = await response.blob();

    const loader = new WebPDFLoader(data);

    const docs = await loader.load();
    const pages = (docs as PDFPage[]);
    // coverting each page into small documents array
  
    const documents = await Promise.all(pages.map(prepareDocument));

    const vectors = await Promise.all(documents.flat().map(getEmbedeDocument));

   
    interface VectorMetadata {
        text: string;
        pageNumber: number;
    }
    
    interface MyVector {
        id: string;
        values: number[];
        metadata: VectorMetadata;
    }

    // stroing the vectors in the pinecone database

  

   try {

    const pineconeRecords = vectors.map((vector : Vector) => {

        if (vector.metadata) {
            
            return {
                id: vector.id,
                values: vector.values,
                metadata: vector.metadata as RecordMetadata
            };
        }
        else {
            // Handle the case when metadata is undefined
            // You can return a default object or throw an error
            return {
                id: vector.id,
                values: vector.values,
                // Default metadata
                metadata: {
                    text: '',
                    pageNumber: 0
                }
            };
        }


    });
    const uniqueNamespace = uuidv4();
    await index.namespace(uniqueNamespace).upsert(pineconeRecords).then((res)=>{
        console.log("successfully inserted");
    });
    return {number:1,namespace:uniqueNamespace};

    
    
   } catch (error) {
         console.log(error);
         return {number:0,namespace:null};
    
   }

    
 
    


    


   





  

    
    
   
    
    
}