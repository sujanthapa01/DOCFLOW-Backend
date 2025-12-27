/**
 * Clean extracted PDF text: collapse spaces and fix newlines
 * @param text Raw text from PDF
 * @returns Cleaned text
 */
export const cleanText = (text: string): string => {
  return text
    .replace(/[ \t]+/g, " ")   
    .replace(/\n+/g, "\n")     
    .trim();                    
};
