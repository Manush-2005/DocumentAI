import { getEmbeddings } from "./Embeddings";
import { index } from "./pinecone";


export async function getMatchesExcelfromembeddings(embeddings: number[],namespace:string){

    try {

        console.log(namespace);
        
        const queryres = await index.namespace(namespace).query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
            
          });

          return queryres.matches || [];



        
    } catch (error) {
        console.log("Error in querying the pinecone database");
        
    }

}



export async function getExcelcontext(query:string,namespace:string){
    const queryembeddings = await getEmbeddings(query);
    const matches = await getMatchesExcelfromembeddings(queryembeddings,namespace);

    const qualifyingDocs = matches?.filter(
        (match) => match.score && match.score > 0.6
    );

    type metadata = {

        text: string;

    };

    let docs = qualifyingDocs?.map(match => (match.metadata as metadata).text);
    return docs?.join("\n");
};