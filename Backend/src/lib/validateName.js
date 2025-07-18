export function isValidUsername(username) {
    const regex = /^[A-Za-z]+$/;

    return regex.test(username);
}
export function containsMyName(str) {
    const lowerStr = str.toLowerCase();
    return lowerStr.includes("neeraj") || lowerStr.includes("niraj") || lowerStr.includes("neiraj") || lowerStr.includes("nieraj") ||
    lowerStr.includes("raaj")
  }
  
  

