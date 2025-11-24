// Numbers

// Decimal numbers

let decimalNumber = 42;
console.log(decimalNumber); // Output: 42

//1234567890
// 42



// Binary numbers

let binaryNumber = 0b101010;
console.log(binaryNumber); // Output: 42

0b10000000000000000000000000000000 // 2147483648
0b01111111100000000000000000000000 // 2139095040
0B00000000011111111111111111111111 // 8388607


// Octal numbers
let octalNumber = 0o52;
console.log(octalNumber); // Output: 42

// Hexadecimal numbers
let hexNumber = 0x2A;
console.log(hexNumber); // Output: 42


// Numeric Separators
let largeNumber = 1_000_000;
console.log(largeNumber); // Output: 1000000



// Number Object
let numObj = new Number(42);
console.log(numObj); // Output: [Number: 42]

const biggerNum = Number.MAX_VALUE;
const smallerNum = Number.MIN_VALUE;
const infinityValue = Number.POSITIVE_INFINITY;
const negativeInfinityValue = Number.NEGATIVE_INFINITY;
const notANumber = Number.NaN;  

console.log(biggerNum); // Output: 1.7976931348623157e+308
console.log(smallerNum); // Output: 5e-324
console.log(infinityValue); // Output: Infinity
console.log(negativeInfinityValue); // Output: -Infinity
console.log(notANumber); // Output: NaN

Number.isFinite(42); // true
Number.isFinite(Infinity); // false
Number.isNaN(NaN); // true
Number.isNaN(42); // false  
Number.isInteger(42); // true
Number.isInteger(42.5); // false



// Number Object Methods
let num = 42.56789;
console.log(num.toFixed(2)); // Output: 42.57
console.log(num.toPrecision(4)); // Output: 42.57
console.log(num.toString(16)); // Output: 2a.91eb851eb851ffc285c8b4395812def1f9f766f334e7a7f9b9563c5b2d3c76e7   // Hexadecimal representation



// Math Object
console.log(Math.PI); // Output: 3.141592653589793
console.log(Math.E); // Output: 2.718281828459045
console.log(Math.sqrt(16)); // Output: 4
console.log(Math.pow(2, 3)); // Output: 8
console.log(Math.random()); // Output: Random number between 0 and 1    



// Strings

// Single quotes
let singleQuoteString = 'Hello, World!';
console.log(singleQuoteString); // Output: Hello, World!

// Double quotes
let doubleQuoteString = "Hello, World!";
console.log(doubleQuoteString); // Output: Hello, World!

// Template literals
let name = 'Indra';
let templateLiteralString = `Hello, ${name}!`;
console.log(templateLiteralString); // Output: Hello, Indra!

// Multi-line strings with template literals
let multiLineString = `This is line 1.
This is line 2.
This is line 3.`;
console.log(multiLineString);
// Output:
// This is line 1.
// This is line 2.
// This is line 3.

// String Object
let strObj = new String('Hello, World!');
console.log(strObj); // Output: [String: 'Hello, World!']   
console.log(String.fromCharCode(72, 101, 108, 108, 111)); // Output: Hello
console.log(String.fromCodePoint(128512)); // Output: 
// Output: 😀

// String Object Methods
let str = 'Hello, World!';
console.log(str.length); // Output: 13
console.log(str.toUpperCase()); // Output: HELLO, WORLD!
console.log(str.toLowerCase()); // Output: hello, world!
console.log(str.indexOf('World')); // Output: 7
console.log(str.slice(0, 5)); // Output: Hello
console.log(str.replace('World', 'JavaScript')); // Output: Hello, JavaScript!
console.log(str.split(', ')); // Output: [ 'Hello', 'World!' ]
console.log(str.trim()); // Output: Hello, World!
// Template Literal Methods
let multiLine = `   Hello, World!   
This is a multi-line string.   `;
console.log(multiLine.trim()); // Output: Hello, World!
                              //         This is a multi-line string.   

// String includes method
console.log(str.includes('World')); // Output: true
console.log(str.includes('JavaScript')); // Output: false

// String startsWith and endsWith methods
console.log(str.startsWith('Hello')); // Output: true
console.log(str.endsWith('!')); // Output: true


// String repeat method
console.log('Ha! '.repeat(3)); // Output: Ha! Ha! Ha!   

// String padStart and padEnd methods
console.log('5'.padStart(3, '0')); // Output: 005
console.log('5'.padEnd(3, '0')); // Output: 500 

// String raw method
console.log(String.raw`Hello\nWorld`); // Output: Hello\nWorld      

// Unicode normalization
console.log('𝓗𝓮𝓵𝓵𝓸'.normalize('NFC')); // Output: 𝓗𝓮𝓵𝓵𝓸
console.log('𝓗𝓮𝓵𝓵𝓸'.normalize('NFD')); // Output: 𝓗𝓮𝓵𝓵𝓸

// Unicode code point at method
console.log('Hello'.codePointAt(1)); // Output: 101

// String iterator
for (const char of 'Hello') {
    console.log(char);
}
// Output:
// H
// e
// l
// l
// o

// Regular Expressions with Strings
let regex = /World/;
console.log(regex.test(str)); // Output: true
console.log(str.match(regex)); // Output: [ 'World', index: 7, input: 'Hello, World!', groups: undefined ]

// String localeCompare method
console.log('a'.localeCompare('b')); // Output: -1
console.log('b'.localeCompare('a')); // Output: 1
console.log('a'.localeCompare('a')); // Output: 0

// String search method
console.log(str.search(/World/)); // Output: 7

// String charAt and charCodeAt methods
console.log(str.charAt(0)); // Output: H
console.log(str.charCodeAt(0)); // Output: 72

// String substring method
console.log(str.substring(0, 5)); // Output: Hello

// String concat method
console.log('Hello, '.concat('World!')); // Output: Hello, World!

// String lastIndexOf method
console.log(str.lastIndexOf('o')); // Output: 8

// String matchAll method
console.log(str.matchAll(/o/g)); // Output: [ 'o', 'o', 'o', index: 4, input: 'Hello, World!', groups: undefined ]

// String toLocaleUpperCase and toLocaleLowerCase methods
console.log(str.toLocaleUpperCase('tr')); // Output: HELLO, WORLD!
console.log(str.toLocaleLowerCase('tr')); // Output: hello, world!



// Embedded expressions in template literals
let a = 5;
let b = 10;
console.log(`The sum of ${a} and ${b} is ${a + b}.`); // Output: The sum of 5 and 10 is 15.

// Tagged template literals
function tag(strings, ...values) {
    console.log(strings); // Output: [ 'Hello, ', '!' ]
    console.log(values);  // Output: [ 'Indra' ]
    return strings[0] + values[0] + strings[1];
}

let taggedResult = tag`Hello, ${name}!`;
console.log(taggedResult); // Output: Hello, Indra!

// Raw string access in template literals
let rawString = String.raw`Line 1\nLine 2`;
console.log(rawString); // Output: Line 1\nLine 2

// Unicode in template literals
let unicodeString = `Unicode character: \u{1F600}`;
console.log(unicodeString); // Output: Unicode character: 
// 😀