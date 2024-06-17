import * as XLSX from 'xlsx';
import { getEmbeddings } from './Embeddings';
import md5 from "md5";
import { Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import { Vector } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { v4 as uuidv4 } from 'uuid';
import {index} from "./pinecone";


export async function ExceltoEmbedding(rows:Array<any>) {
    const embeddings = await Promise.all(rows.map( async row => {
        const rowString = JSON.stringify(row);
        const hash = md5(rowString);
        const embedding = await getEmbeddings(rowString);
        return {
            id:hash,
            values:embedding,
            metadata:{
                text:rowString
            }
        };
      }));
    return embeddings;


};


export async function URLtoExcelObject(url: string) {

    const response = await fetch(url);

    const data = await response.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });

    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet);

    const vectorsgroup = [];
    for (let i = 0; i < rows.length; i += 5) {
        const group = rows.slice(i, i + 5);
        vectorsgroup.push(group);
    }


    const vectors = await ExceltoEmbedding(vectorsgroup);
  


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
                return {
                    id: vector.id,
                    values: vector.values,
                    // Default metadata
                    metadata: {
                        text: '',
                    }
                };
            }
    
    
        });
        const uniqueNamespace = uuidv4();
        await index.namespace(uniqueNamespace).upsert(pineconeRecords).then((res)=>{
            console.log("successfully inserted excel data");
        });
        return {number:1,namespace:uniqueNamespace};
    
        
        
       } catch (error) {
             console.log(error);
             return {number:0,namespace:null};
        
       };

  
   
}