/*
    Question 3
    You’re given an error log file that consists of two types of errors. 
    Each line on the log file shows one error. Every line is a space-delimited string. 
    All lines begin with an alphanumeric id. After the id, the line consists of either:

    A list of words using only English letters (error type 1)
    A list of only integers (error type 2)

    For example:
    ‘v1 err var’: “v1” is the id and “err var” is the error data. Since the error data is all words using English letters, then it’s an error type 1. 

    ‘b12 8 3 5 2’: “b12” is the id and “8 3 5 2” is the error data. Since the error data is all integers, then it’s an error type 2. 

    You have to reorder the data such that all of the lines with words (error type 1) are at the top of the log file. 
    The lines with words are ordered lexicographically, ignoring the identifier except in the case of ties. 
    In the case of ties (if there are two lines that are identical except for the identifier) the identifier is used to break the tie (order lexicographically). 
    Alphanumeric should be sorted in ASCII order (numbers come before letters, and uppercase letters precede lowercase letters). 
    Lines with integers (error type 2) must be left in the original order they were in the file.
    Write an algorithm to reorder the data in the log file, according to the rules above.


    Sample Input:
    logLines = [
        ‘b12 8 3 5 2’,
        ‘v1 err var’,
        ‘ap9 3 9’, 
        ‘hf2 err var’,
        ‘t12 goog  ana’,
        ‘u2 fa handle err’
    ]

    Sample Output:
    [
        ‘hf2 err var’,
        ‘v1 err var’,
        ‘u2 fa handle err’,
        ‘t12 goog  ana’,
        ‘b12 8 3 5 2’,
        ‘ap9 3 9’
    ]
 
 */
class OrderLog {
    constructor( lines ) {
        this.lines = lines;
        console.log("Order Log Inputed", this.lines);
        console.log("Order Log Ouputed", this.init());

    }
    getId( line ) {
        return line.split(" ")[0];
    }
    removeIdFromLine( line, id ) {
        line = line.split(" ")
        line.shift();
        return line.join(" ");
    }
    findLineType( line ) {
        const id = this.getId( line );
        const lineToArr = line.split(" ");
        
        // remove the id to determine line type by its content
        lineToArr.splice(line.indexOf(id), 1); 
        
        // Make them all number, if one is not a number it will be NaN
        // Sum them all, otherwise is NaN
        const result = lineToArr.map(Number).reduce((a,c) => a + c); 
        
        // return by type
        return isNaN(result) ? "type-1" : "type-2";
    }
    breakingTies(a, b) {
        const aId = this.getId(a);
        const bId = this.getId(b);
        
        // equal lines we sort them by id
        if( this.removeIdFromLine(a) === this.removeIdFromLine(b)) {
            return aId.localeCompare(bId);
        } else {
            if( this.removeIdFromLine(a) > this.removeIdFromLine(b)) {
                return 1;
            }
            if( this.removeIdFromLine(a) < this.removeIdFromLine(b)) {
                return -1
            }
        }
    }
    init() {
        // types1 sorted
        const type1s = this.lines.filter((line) => {
            return this.findLineType(line) === "type-1";
        }).sort(this.breakingTies.bind(this));
        // types2         
        const type2s = this.lines.filter((line) => {
            return this.findLineType(line) === "type-2";
        });

        const result = type1s.concat(type2s); // [...type1s, ...type2s]
        // console.log( result );
        return result;
    }
}
new OrderLog([
    'b12 8 3 5 2',
    'v1 err var',
    'ap9 3 9',
    'hf2 err var',
    't12 goog  ana',
    'u2 fa handle err'
]);
/**
    [
    'hf2 err var',
    'v1 err var',
    'u2 fa handle err',
    't12 goog  ana',
    'b12 8 3 5 2',
    'ap9 3 9'
    ]
 */