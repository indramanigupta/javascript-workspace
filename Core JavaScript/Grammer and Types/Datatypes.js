// Data structures and types
//  Datatypes: 
// 1. Primitive Types - Seven data types that are primitives:
// - Number
// - BigInt (ES11)
// - String
// - Boolean
// - Undefined
// - null
// - Symbol (ES6)

// - Object Types (Datatypes that are not primitive):

// 2. Reference Types
// - Object
// - Array
// - Function 
// - Date
// - RegExp


let number = 42; // Number
let bigIntNumber = 9007199254741991n; // BigInt
let string = "Lets learn JavaScript!"; // String
let booleanValue = true; // Boolean
let undefinedValue; // Undefined
let nullValue = null; // null
let symbolValue = Symbol("uniqueIdentifier"); // Symbol

let objectValue = { name: "Indra", age: 30 }; // Object
let arrayValue = [1, 2, 3, 4, 5]; // Array
let functionValue = function() { return "Hello, Developers!"; }; // Function
let dateValue = new Date(); // Date
let regexValue = /ab+c/; // RegExp  


// Numbers and the '+' operator    

x = "The number is " + 50; // String concatenation
console.log(x); // Output: The number is 50

y = 20 + 30; // Numeric addition
console.log(y); // Output: 50

z = 10 + " Mangoes"; // String concatenation
console.log(z); // Output: 10 Mangoes

z = "57" + 7; // "577"
console.log(z); // Output: 577

a = "5" - 2; // Numeric subtraction 
console.log(a); // Output: 3

"5" * 2; // Numeric multiplication
console.log(a); // Output: 10

b = "10" / 2; // Numeric division
console.log(b); // Output: 5

c = "10" % 3; // Numeric modulus
console.log(c); // Output: 1

d = "10" - "4"; // Numeric subtraction
console.log(d); // Output: 6


// Conversion between data types
let numString = "123";
let convertedNumber = Number(numString); // Converts string to number
console.log(convertedNumber); // Output: 123
console.log(typeof convertedNumber); // Output: number 

parseInt("456"); // Converts string to integer
parseFloat("3.14"); // Converts string to floating-point number

parseInt("100", 2); // Converts string to integer with base 2 // Output: 4


"1.1" + "1.1"; // Output: "1.11.1" (string concatenation)


parseFloat("1.1") + parseFloat("1.1"); // Output: 2.2 (numeric addition)

// OR

(+"1.1.") + (+"1.1"); // Output: 2.2 (numeric addition)



let strNumber = 456;
let convertedString = String(strNumber);
console.log(convertedString); // Output: "456"
console.log(typeof convertedString); // Output: string

let boolValue = true;
let convertedBoolString = String(boolValue);
console.log(convertedBoolString); // Output: "true"
console.log(typeof convertedBoolString);    // Output: string

let strBool = "false";
let convertedBool = (strBool === "true"); // Converts string to boolean
console.log(convertedBool); // Output: false
console.log(typeof convertedBool); // Output: boolean 

// Type checking
console.log(typeof number); // Output: number
console.log(typeof string); // Output: string
console.log(typeof booleanValue); // Output: boolean
console.log(typeof undefinedValue); // Output: undefined
console.log(typeof nullValue); // Output: object (this is a known quirk in JavaScript)
console.log(typeof symbolValue); // Output: symbol
console.log(typeof objectValue); // Output: object
console.log(typeof arrayValue); // Output: object
console.log(typeof functionValue); // Output: function
console.log(typeof dateValue); // Output: object
console.log(typeof regexValue); // Output: object   


// Literals

/* 
    These are fixed values—not variables—that you literally provide in your script, A literal is a fixed value that is directly written into the code. 
    Literals can represent different data types, such as numbers, strings, booleans, objects, arrays, and more. 
*/



let numLiteral = 100; // Number literal
let strLiteral = "Hello, World!"; // String literal
let boolLiteral = false; // Boolean literal
let nullLiteral = null; // Null literal
let undefinedLiteral; // Undefined literal
let symbolLiteral = Symbol("description"); // Symbol literal

let objLiteral = { key: "value" }; // Object literal
let arrLiteral = [10, 20, 30]; // Array literal
let funcLiteral = function() { return "Function literal"; }; // Function literal
let dateLiteral = new Date("2024-01-01"); // Date literal
let regexLiteral = /hello/i; // RegExp literal  

/*
    Array literals: Array literals create Array objects.

    An array literal creates a new array object every time the literal is evaluated. 
    For example, an array defined with a literal in the global scope is created once when the script loads. 
    However, if the array literal is inside a function, a new array is instantiated every time that function is called.

    These are used to represent arrays in JavaScript.
    Example: 
*/
     let arr = [1, 2, 3];

    const coffees = ["French Roast", "Colombian", "Kona"];

    const fish = [ "Lionfish", , "Angel Fish" ]; // Note the empty slot

    console.log(fish); 
    // [ 'Lion', <1 empty item>, 'Angel' ]

    const plants = [ "Fern", "Cactus", "Bamboo" ];
    console.log(plants[1]);  
    // Output: Cactus

    const veggies = [ "Carrot", "Broccoli", "Asparagus" ];
    veggies[1] = "Spinach";

    console.log(veggies);
    // Output: [ 'Carrot', 'Spinach', 'Asparagus' ]


    //In the following example, the length of the array is four, and myList[0] and myList[2] are missing.
    const myList = [, "home", , "school"];
    console.log(myList.length);
    // Output: 4
    console.log(myList);


    //Note: Trailing commas help keep git diffs clean when you have a multi-line array, because appending an item to the end only adds one line, but does not modify the previous line.

    const myList1 = [
        "home",
        "school",
        + "hospital",
    ];
    console.log(myList1);
    // Output: [ 'home', 'school',  hospital' ]


    // Note: You can use expressions within array literals.
    const myArray = [1 + 2, 3 * 4, 5 / 0];
    console.log(myArray);
    // Output: [ 3, 12, Infinity ]

    // Note:
    // However, when writing your own code, 
    // you should explicitly declare the missing elements as undefined, 
    // or at least insert a comment to highlight its absence. Doing this increases your code's clarity and maintainability.


    const myList2 = ["home", /* empty */, "school", /* empty */, ];
    console.log(myList2);
    // Output: [ 'home', <1 empty item>, 'school', <1 empty item> ]


/*
    Function literals:



*/

/*
    Boolean literals: These are the two literal values that represent the two possible states of a boolean: true and false.
    Example:

*/
     let isTrue = true; // Boolean literal
     let isFalse = false; // Boolean literal

/*
     Numeric literals:

     Example:
     
*/
    let num1 = 42; // Integer literal // Numeric literal can be unsigned or signed
    let num2 = 3.14; // Floating-point literal // Numeric literal can be unsigned or signed
    let num3 = -7; // Signed numeric literal
    let num4 = 0b1010; // Binary numeric literal
    let num5 = 0o12; // Octal numeric literal
    let num6 = 0xA; // Hexadecimal numeric literal

    // Note: Numeric literals can also include underscores for better readability.
    let num7 = 1_000_000; // One million
    let num8 = 1_000; // One thousand
    let num9 = 100; // One hundred
    let num10 = 10; // Ten  

/*
    Object literals:

    An object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces ({}).

    Example:
    

*/
    let obj = { name: "Indra", age: 30 }; // Object literal

    console.log(obj);
    // Output: { name: 'Indra', age: 30 }

    // Note: Object literals can also include methods.
    let objWithMethod = {
        name: "Indra",
        age: 30,
        greet: function() {
            console.log("Hello, my name is " + this.name);
        }
    };
    objWithMethod.greet(); // Output: Hello, my name is Indra

    // Note: Object literals can also include computed property names.
    let propName = "age";
    let objWithComputedProp = {
        name: "Indra",
        [propName]: 30
    };
    console.log(objWithComputedProp);
    // Output: { name: 'Indra', age: 30 }   

    const sales = "Taigun";

    function carTypes(name) {
      return name + " is a car type.";
    }

    const car = {
      BMW: 5000,
      Audi: 4000,
      getCar: carTypes("Taigun"),
      special: sales
    };

    console.log(car);
    // Output: { BMW: 5000, Audi: 4000, getCar: 'Taigun is a car type.', special: 'Taigun' }


    const car1 = { manyCars: { a: "Mazda", b: "Jeep" }, 7: "Saab" };
    console.log(car1.manyCars.a); // Mazda
    console.log(car1.manyCars.b); // Jeep
    console.log(car1[7]); // Saab


    const unusualPropertyNames = {
        "": "An empty string",
        "!": "Bang!",
    };
    
    // console.log(unusualPropertyNames.""); // SyntaxError: Unexpected string
    // console.log(unusualPropertyNames.!); // SyntaxError: Unexpected token !

    console.log(unusualPropertyNames[""]); // Output: An empty string
    console.log(unusualPropertyNames["!"]); // Output: Bang!


/*
    RegExp literals:

    Example:
     
*/
    let regex = /pq+r/; // RegExp literal
    console.log(regex); // Output: /pq+r/

/*
     String literals:

    Example:

*/
    let str = "Hello, world!"; // String literal
    console.log(str); // Output: Hello, world!  
    
    let str2 = 'JavaScript is fun!'; // String literal
    console.log(str2); // Output: JavaScript is fun!
    
    let str3 = `Template literals are great!`; // Template literal
    console.log(str3); // Output: Template literals are great!

    // Will print the number of symbols in the string including whitespace.
    console.log("Matt's cat".length); // In this case, 10.
    console.log('She said "Hello!"'.length); // In this case, 17.

    console.log(`Line1
Line2`.length); // In this case, 12.

    let multiLineString = `This is a multi-line
                            string using template literals.`;
    console.log(multiLineString);

    // Output:
    // This is a multi-line
    // string using template literals.



   


    


    


   
