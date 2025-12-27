import { PDFParse } from 'pdf-parse';

/**
 * 
 * @param buffer as parameter
 * @returns extracted text
 */

export const extractText = async (buffer: Buffer): Promise<string> => {
  try {

     // Initialize the parser with buffer
    const parser = new PDFParse({data: buffer})
  
    // Extract all text
   const result = await parser.getText()

   await parser.destroy() 

    console.log(result.text)
    return result.text || "";
  } catch (error) {
    console.error("Failed to extract PDF text:", error);
    return "";
  }
};
