import {index} from "./pinecone";
import { getEmbeddings } from "./Embeddings";


async function retry(fn:any, retriesLeft = 5, interval = 100) {
    try {
      return await fn();
    } catch (error) {
      if (retriesLeft) {
        return new Promise((resolve) => {
           console.log(retriesLeft);
          setTimeout(() => {
            resolve(retry(fn, retriesLeft - 1, interval));
          }, interval);
        });
        
      } else {
        throw new Error("Maximum retries exceeded");
      }
    }
  }




export async function getMatchesfromembeddings(embeddings: number[],namespace:string){

    try {
        console.log(namespace);

        
        const queryres = await retry(() => index.namespace(namespace).query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
          }));

          return queryres?.matches || [];
        
    } catch (error) {
        
        console.log("Error in querying the pinecone database",error);
        
    }

}




export async function getcontext(query:string,namespace:string){

    const queryembeddings = await getEmbeddings(query);
    const matches = await getMatchesfromembeddings(queryembeddings,namespace);

    const qualifyingDocs = matches?.filter(
        (match:any) => match.score && match.score > 0.6
    );

    type metadata = {
        text: string;
        pageNumber: number;
    }

    let docs = qualifyingDocs?.map((match: { metadata: { text: string; pageNumber: number; }; }) => (match.metadata as metadata).text);
    return docs?.join("\n")

}