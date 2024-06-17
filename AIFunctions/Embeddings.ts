import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "embedding-001", // 768 dimensions
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: "Document title",
  });


  export async function getEmbeddings(text:string){
    const cleandedtext = text.replace(/\n/g, " ");
    const res = await embeddings.embedQuery(cleandedtext);
  
    
    return res;
    
  };


