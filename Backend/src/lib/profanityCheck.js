import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Filter } from "bad-words";

// ✅ Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ✅ Resolve the path relative to this file
const jsonPath = path.resolve(__dirname, "profanityWords.json");
const customBadWords = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

// Set up filter
const filter = new Filter();
filter.addWords(...customBadWords);


function containsProfanity(str) {
  str = str.toLowerCase(); // Normalize to lowercase
  const words = str.trim().split(/\s+/); // Split by any whitespace
  return words.some(word => filter.isProfane(word));
}
export default containsProfanity;



