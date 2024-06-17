import { Pinecone } from '@pinecone-database/pinecone';



const pc = new Pinecone({
  apiKey: '4106c64a-2f51-46d6-8eb9-b958f4a8b07a'
});
const index = pc.index('documentai');



export {index};