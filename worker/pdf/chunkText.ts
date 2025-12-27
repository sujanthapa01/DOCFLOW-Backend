export const chunkText = (
    text:string,
    chunkSize=500,
    overlap=100
): string[] => {

/**
 * @param text
 * @param chunkSize chunk size
 * @param overlap text overlap size
 * @returns string[] chunks
 */

const chunks : string[] = []
let start = 0

while(start < text.length){
    const end = start + chunkSize
    // console.log("start",start)
    // console.log("end",end)
    chunks.push(text.slice(start,end))
    // console.log("slice at: ",text.slice(start,end))
    start += chunkSize - overlap



}
// console.log(chunks)
return chunks
}