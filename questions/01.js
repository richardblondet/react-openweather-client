/**
    Write a function that adds all values in an array.
    
    Sample Input:
    [3, 4, 6, 7, 2]
    
    Sample output:
    22
 */
export const addArrValues = (arr) => {
    return arr.reduce((preV, curV) => {
        return preV + curV;
    });
}