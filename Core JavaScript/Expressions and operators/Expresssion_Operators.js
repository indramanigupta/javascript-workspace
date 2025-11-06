// Assignment Operators

// Assignment operators assign values to JavaScript variables.

x = f(y); // Assigns the value of f(y) to x

// The addition assignment operator (+=) adds a value to a variable and assigns the result to that variable.

let x = 10;
let y = 5;
x += y; // x = x + y
console.log(x); // 15

// Subtraction assignment operator (-=)

x -= y; // x = x - y
console.log(x); // 10

// Multplication assignment operator (*=)

x *= y; // x = x * y
console.log(x); // 50

// Division assignment operator (/=)

x /= y; // x = x / y
console.log(x); // 10

// Modulus assignment operator (%=)

x %= y; // x = x % y
console.log(x); // 0    

// Exponentiation assignment operator (**=)

x = 10;
x **= 2; // x = x ** 2
console.log(x); // 100

console.log(x **= 'hello'); // NaN



// Bitwise Operators:


// Left shift assignment operator (<<=)
// Shifts the bits of a number to the left and assigns the result to that number.

// x <<= y is equivalent to x = x << y, except that the expression x is only evaluated once.

x = 5;
x <<= 1; // x = x << 1
console.log(x); // 10


//---------------------------------------------------
// Example: Using left shift assignment operator
let a = 5; // 00000000000000000000000000000101

a <<= 2; // 00000000000000000000000000010100

console.log(a);
// Expected output: 20
//---------------------------------------------------



// Right shift assignment operator (>>=)

// The right shift assignment (>>=) operator performs right shift on the two operands and assigns the result to the left operand.
x >>= 1; // x = x >> 1
console.log(x); // 5

//---------------------------------------------------
// Example: Using right shift assignment operator
let b = 20; // 00000000000000000000000000010100

b >>= 2; // 00000000000000000000000000000101
console.log(b);
// Expected output: 5
//---------------------------------------------------


// Unsigned right shift assignment operator (>>>=)

// The unsigned right shift assignment (>>>=) operator shifts the bits of the number to the right and fills the leftmost bits with zeros.

x >>>= 1; // x = x >>> 1
console.log(x); // 2

//---------------------------------------------------
// Example: Using unsigned right shift assignment operator
let c = -20; // 11111111111111111111111111101100
c >>>= 2; // 00111111111111111111111111111101
console.log(c);
// Expected output: 1073741821
//---------------------------------------------------



// Bitwise AND assignment operator (&=)

// The bitwise AND assignment (&=) operator performs bitwise AND on the two operands and assigns the result to the left operand.


x &= 3; // x = x & 3
console.log(x); // 2

a = 5; // 00000000000000000000000000000101
a &= 3; // 00000000000000000000000000000011
console.log(a);
// Expected output: 1

a &= 2; // a = a & 2; // 00000000000000000000000000000010
console.log(a);
// Expected output: 0



// Bitwise OR assignment operator (|=)

// The bitwise OR assignment (|=) operator performs bitwise OR on the two operands and assigns the result to the left operand.

x |= 1; // x = x | 1
console.log(x); // 3 

a = 5; // 00000000000000000000000000000101
a |= 3; // 00000000000000000000000000000011
console.log(a);
// Expected output: 7
a |= 2; // a = a | 2; // 00000000000000000000000000000010
console.log(a);
// Expected output: 7 



// Bitwise XOR assignment operator (^=)

// The bitwise XOR assignment (^=) operator performs bitwise XOR on the two operands and assigns the result to the left operand.    

x ^= 2; // x = x ^ 2
console.log(x); // 1

a = 5; // 00000000000000000000000000000101
a ^= 3; // 00000000000000000000000000000011
console.log(a);
// Expected output: 6
a ^= 2; // a = a ^ 2; // 00000000000000000000000000000010
console.log(a);
// Expected output: 4   
//---------------------------------------------------
// Example: Using bitwise XOR assignment operator
let d = 6; // 00000000000000000000000000000110

d ^= 3; // 00000000000000000000000000000011
console.log(d);
// Expected output: 5
//---------------------------------------------------


// Logical Operators:

// Logical AND assignment operator (&&=)

let e = true;
e &&= false;
console.log(e); // false

e = true;
e &&= true;
console.log(e); // true
//---------------------------------------------------
// Example: Using logical AND assignment operator
let f = true;
f &&= false;
console.log(f); // false

f = true;
f &&= true;
console.log(f); // true
//---------------------------------------------------

// Logical OR assignment operator (||=)

let g = false;
g ||= true;
console.log(g); // true

g = false;
g ||= false;
console.log(g); // false

//---------------------------------------------------

// Example: Using logical OR assignment operator
let h = false;
h ||= true;
console.log(h); // true 

h = false;
h ||= false;
console.log(h); // false
//---------------------------------------------------   



// Nullish coalescing assignment operator (??=)

// The nullish coalescing assignment (??=) operator, also known as the logical nullish assignment operator, only evaluates the right operand and assigns to the left if the left operand is nullish (null or undefined).

let i = null;
i ??= 'default';
console.log(i); // 'default'    

i = undefined;
i ??= 'default';
console.log(i); // 'default'    

i = 0;
i ??= 'default';
console.log(i); // 0
//---------------------------------------------------
// Example: Using nullish coalescing assignment operator
let j = null;
j ??= 'default';
console.log(j); // 'default'

j = undefined;
j ??= 'default';
console.log(j); // 'default'

j = 0;
j ??= 'default';
console.log(j); // 0
//---------------------------------------------------




// Comparison Operators

// Comparison operators compare two values and return a boolean value (true or false) based on the comparison.

let m = 10;
let n = 5;

console.log(m == n); // false  // equality
console.log(m != n); // true    // inequality
console.log(m === n); // false // strict equality
console.log(m !== n); // true // strict inequality
console.log(m > n); // true // greater than
console.log(m < n); // false // less than
console.log(m >= n); // true // greater than or equal to
console.log(m <= n); // false // less than or equal to

//---------------------------------------------------
// Example: Using comparison operators
let p = 15;
let q = 20;

console.log(p == q); // false 
console.log(p != q); // true
console.log(p === q); // false
console.log(p !== q); // true
console.log(p > q); // false
console.log(p < q); // true
console.log(p >= q); // false
console.log(p <= q); // true

//---------------------------------------------------



// Arithmetic Operators

let a1 = 10;
let b1 = 3;

console.log(a1 % b1); // 1  // modulus
console.log(a1 ** b1); // 1000  // exponentiation
console.log(++a1); // 11  // increment
console.log(--b1); // 2   // decrement 

// Unery Operator (Unary negation)
console.log(-b1); // -2  // unary minus

console.log(+a1); // 11  // unary plus

//---------------------------------------------------


// String Operators :
let str1 = "Hello";
let str2 = "World";

console.log(str1 + " " + str2); // "Hello World"
console.log(`${str1} ${str2}`); // "Hello World"

//---------------------------------------------------
// Example: Using string operators
let firstName = "John";
let lastName = "Toponov";

console.log(firstName + " " + lastName); // "John Toponov"
console.log(`${firstName} ${lastName}`); // "John Toponov"
//---------------------------------------------------




// Conditional (ternary) operator:

//The conditional operator is the only JavaScript operator that takes three operands. The operator can have one of two values based on a condition.

// Example: Using conditional (ternary) operator
let age = 18;
let canVote = (age >= 18) ? "Yes" : "No";
console.log(canVote); // "Yes"

//---------------------------------------------------
// Example: Using conditional (ternary) operator
let score = 85;
let grade = (score >= 90) ? "A" : (score >= 80) ? "B" : "C";
console.log(grade); // "B" 
//---------------------------------------------------


// Comma operator: The comma operator (,) allows you to evaluate multiple expressions, returning the value of the last expression.  

// Example: Using comma operator
let r = (1, 2, 3);
console.log(r); // 3


const t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const z = [t, t, t, t, t];

for (let i = 0, j = 9; i <= j; i++, j--) {
  console.log(`z[${i}][${j}]= ${z[i][j]}`);
}

//Output:
// z[0][9]= 9
// z[1][8]= 8
// z[2][7]= 7
// z[3][6]= 6
// z[4][5]= 5

//---------------------------------------------------
// Example: Using comma operator
let x1 = (5, 10, 15);
console.log(x1); // 15

const arr = [1, 2, 3, 4, 5];
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(`arr[${i}] = ${arr[i]}`);
}   
//  Output:
// arr[0] = 1
// arr[1] = 2
// arr[2] = 3
// arr[3] = 4
// arr[4] = 5   

//---------------------------------------------------

// typeof operator:


// The typeof operator returns a string indicating the type of the unevaluated operand. operand is the string, variable, keyword, or object for which the type is to be returned.


// typeof operator: The typeof operator returns a string indicating the type of the unevaluated operand.
console.log(typeof 42); // "number"
console.log(typeof 'hello'); // "string"
console.log(typeof true); // "boolean"
console.log(typeof {}); // "object"
console.log(typeof undefined); // "undefined"
console.log(typeof function(){}); // "function"
//---------------------------------------------------
// Example: Using typeof operator

console.log(typeof 100); // "number"
console.log(typeof 'JavaScript'); // "string"
console.log(typeof false); // "boolean"
console.log(typeof []); // "object"
console.log(typeof undefined); // "undefined"
console.log(typeof function(){}); // "function"
//---------------------------------------------------


// void operator:

// The void operator evaluates the given expression and then returns undefined. It is often used to obtain the undefined value.

console.log(void 0); // undefined
console.log(void (5 + 10)); // undefined    
//---------------------------------------------------
// Example: Using void operator
console.log(void 0);        // undefined
console.log(void (3 + 4)); // undefined
//---------------------------------------------------   


// delete operator:

// The delete operator removes a property from an object. If the property is successfully deleted, it returns true; otherwise, it returns false.

const obj = { a: 1, b: 2, c: 3 };
console.log(delete obj.b); // true
console.log(obj); // { a: 1, c: 3 } 
//---------------------------------------------------
// Example: Using delete operator
const myObj = { x: 10, y: 20, z: 30 };
console.log(delete myObj.y); // true
console.log(myObj); // { x: 10, z: 30 }
//---------------------------------------------------




// instanceof operator:

// The instanceof operator tests whether an object is an instance of a specific class or constructor function. It returns true if the object is an instance of the specified class; otherwise, it returns false.

class Person {}
const person1 = new Person();
console.log(person1 instanceof Person); // true
console.log(person1 instanceof Object); // true
//---------------------------------------------------
// Example: Using instanceof operator
const person2 = new Person();
console.log(person2 instanceof Person); // true
console.log(person2 instanceof Object); // true

//---------------------------------------------------



// Relational operator:

// in operator:

// The in operator checks if a specified property exists in an object. It returns true if the property is found; otherwise, it returns false.


const obj2 = { a: 1, b: 2, c: 3 };
console.log('a' in obj2); // true
console.log('d' in obj2); // false

//---------------------------------------------------
// Example: Using in operator
const myObj2 = { x: 10, y: 20, z: 30 };
console.log('x' in myObj2); // true
console.log('a' in myObj2); // false
//---------------------------------------------------

// Arrays
const trees = ["redwood", "bay", "cedar", "oak", "maple"];
0 in trees; // returns true
3 in trees; // returns true
6 in trees; // returns false
"bay" in trees; // returns false
// (you must specify the index number, not the value at that index)
"length" in trees; // returns true (length is an Array property)

// built-in objects
"PI" in Math; // returns true
const myString = new String("coral");
"length" in myString; // returns true

// Custom objects
const myCar = { make: "Honda", model: "Accord", year: 1998 };
"make" in myCar; // returns true
"model" in myCar; // returns true

"year" in myCar; // returns true
"color" in myCar; // returns false



// Basic expression operators:

// Grouping operator ( ):

let q1 = 5 + 3 * 2; // Multiplication has higher precedence than addition
console.log(q1); // 11

let r1 = (5 + 3) * 2; // Parentheses change the order of evaluation
console.log(r1); // 16


//---------------------------------------------------
// Example: Using grouping operator
let s1 = 10 + 2 * 3; // Multiplication has higher precedence than addition
console.log(s1); // 16

let s2 = (10 + 2) * 3; // Parentheses change the order of evaluation
console.log(s2); // 36

//---------------------------------------------------

// Member access operator (.):

const person = { name: "Alice", age: 30 };
console.log(person.name);
console.log(person.age);
//---------------------------------------------------


// Property access operator ([]):

//The property accessor syntax gets property values on objects, using either dot notation or bracket notation.


const car = { make: "Toyota", model: "Camry" };
console.log(car["make"]);
console.log(car["model"]);
//---------------------------------------------------

// Example: Using property access operator
const bike = { brand: "Yamaha", type: "Sport" };
console.log(bike["brand"]);
console.log(bike["type"]);
//---------------------------------------------------




// Function call operator ( ):

function greet(name) {
  return `Hello, ${name}!`;
}   

console.log(greet("Bob")); // "Hello, Bob!"
//---------------------------------------------------
// Example: Using function call operator
function add(a, b) {
  return a + b;
}   
console.log(add(5, 10)); // 15