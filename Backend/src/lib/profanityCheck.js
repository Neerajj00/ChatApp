import {Filter} from 'bad-words';
const filter = new Filter();

const customBadWords = [
  // English
  "fuck", "fucker", "motherfucker", "bitch", "bastard", "asshole", "shit",
  "dick", "pussy", "slut", "whore", "cunt", "damn", "nigger", "retard", "fag",
  "suckmydick", "dumbass", "cock", "father", "mother", "brother", "sister", "son", "daughter", "uncle", "aunt", "grandfather", "grandmother",

  // Hindi (Roman)
  "chutiya", "bhosdike", "bhenchod", "madarchod", "lund", "randi", "gaand",
  "gandu", "chut", "tatti", "harami", "kutte", "kamina", "chakka", "lodu",
  "chod", "chodu", "bhosri", "neeraj" , "niraj" , "papa", "mummy", "baba", "dada", "dadi", "nani", "nana", "bhaiya", "behen","bhosda",
  "bhosad"

];


filter.addWords(...customBadWords);


function containsProfanity(str) {
  str = str.toLowerCase(); // Normalize to lowercase
  const words = str.trim().split(/\s+/); // Split by any whitespace
  return words.some(word => filter.isProfane(word));
}
export default containsProfanity;



