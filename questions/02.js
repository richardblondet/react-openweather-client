/**
    Question 2
    Suppose we have a large string of ASCII characters. 
    Write an efficient function to find the first non-repeated character in the string. 
    Discuss the efficiency of your algorithm.

    Sample Input:
    “teeter”

    Sample output:
    “r” 
*/
export const find1stNonRptdChr = (str) => {
    const result = str.split("").filter((chr, inx) => {
        return str.indexOf(chr) === inx && str.indexOf(chr, inx + 1) === -1
    });
    return result.length ? result.shift() : false;
}
/**
    Explanation:
    1. We separate the string into an array and use the filter iterator
    2. Inside de iteration function we check: 
        a. indexOf returns the position of the first appearance, which is the character in current pos 
        b. indexOf returns -1 if the character in the position does not exists, so we check from the current position onwards by passing the next pos in sec parameter
    3. Filter returns a new array so if the result has length we return the value using shift and false if not enxisting

    Of course, since performance is not a requirement, otherwise iterating directly from the length of the str with a for loop would be faster like:
    (compared at https://jsbench.me/)
 */
export const find1stNonRptdChr2 = (str) => {
    for (let i = 0; i < str.length; i++) {
        let chr = str.charAt(i);
        if (str.indexOf(chr) === i && str.indexOf(chr, i + 1) === -1) {
            return chr;
        }
    }
    return false;
}
