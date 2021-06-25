export const convertArrayPeerToObject = (array:any[])=>{
    const query:any = {};
   if (array.length > 0){
       for (const index in array){
            query[`peer${index}`] = array[index];
       }
   }
   return query;
}