/* 
    JavaScript is a dynamically typed language. This means that you don't have to specify the data type of a variable when you declare it. 
    The JavaScript engine automatically determines the data type based on the value assigned to the variable. 
*/

const Fruit = "Apple";

// Single-line comment: This is a simple JavaScript file demonstrating basic syntax

// This is one single-line comment

/*
Multi-line comment:
This file includes variable declaration, data types, and basic operations.
*/  

/*
* this is a multipline comment
* that spans multiple lines
* to explain the code better
*/

// #!/usr/bin/env node - This is third type of comment syntax at the start of some JavaScript files

let number = 42; // Integer
let decimal = 3.14; // Floating-point number
let isJavaScriptFun = true; // Boolean
let greeting = "Hello, World!"; // String   


// Declarations

var oldVariable = "I am old-varaible"; // 'var' declaration 

var oldVariable; // Redeclaration allowed // Optionally initialing it to a value



let anotherVariable; // 'let' declaration without initialization - will be 'undefined' by default // Optionally initialing it to a value

let newVariable = "I am new-variable"; // 'let' declaration // Block-scoped, local variable, cannot be redeclared in the same scope, must be initialized before use

// let newVariable = "Trying to redeclare"; // Redeclaration not allowed, will throw an error


const FILE_NAME = "config.json"; // 'const' declaration // Block-scoped, cannot be redeclared or reassigned, must be initialized at the time of declaration // read-only named constant

// FILE_NAME = "new_config.json"; // Reassignment not allowed, will throw an error



// Variables

// The name of variables - called identifiers - must follow these rules:
// 1. Can contain letters, digits, underscores, and dollar signs.
// 2. Must begin with a letter, underscore (_), or dollar sign ($). Subsequent characters can also be digits (0 – 9). 
//      Because JavaScript is case sensitive, letters include the characters A through Z (uppercase) as well as a through z (lowercase).
// 3. Cannot contain spaces or special characters (e.g., !, @, #, %, etc.).
// 4. Cannot be a reserved keyword in JavaScript (e.g., let, const, var, function, etc.).   

//  Variable names should be descriptive and follow camelCase convention for better readability.

// Some examples of legal names are Number_hits, temp99, $credit, and _name.

// Some examples of illegal names are 7vara11297 (starts with a digit), local-variable (contains a hyphen), and var (reserved keyword).


// Declaring Variables:
var x; // Declares a variable named x
let y; // Declares a block-scoped variable named y
const z = 10; // Declares a constant named z and initializes it to 10   

// Initializing Variables:
x = 5; // Assigns the value 5 to the variable x
y = "Hello"; // Assigns the string "Hello" to the variable y           
z = 15; // Assigns the value 15 to the constant z (will throw an error)

// Using Variables:
console.log(x); // Outputs the value of x to the console
console.log(y); // Outputs the value of y to the console
console.log(z); // Outputs the value of z to the console


/* Note on Initializers:
An initializer is the part of a variable declaration that assigns an initial value to the variable.

The declaration allows the variable to be accessed later in code without throwing a ReferenceError, while the initializer assigns a value to the variable. 

In var and let declarations, the initializer is optional. If a variable is declared without an initializer, it is assigned the value undefined.
*/

let uninitializedVar_X; // Declared without an initializer, so its value is undefined
console.log(uninitializedVar_X); // Outputs: undefined

let initializedVar_X = 35; // Declared with an initializer, so its value is 100
console.log(initializedVar_X); // Outputs: 35

// In essence, let x = 42 is equivalent to let x; x = 42.


// Constant Declarations:

// Constants are declared using the const keyword. A constant must be initialized at the time of declaration, and its value cannot be changed later in the code.

// Constant Variables:  const
// const x; // SyntaxError: Missing initializer in const declaration
const PI = 3.14159; // Declares a constant named PI and initializes it to 3.14159

console.log(PI); // Outputs the value of PI to the console

// PI = 3.14; // TypeError: Assignment to constant variable. (will throw an error if uncommented)

// Note: While the value of a constant variable cannot be changed, if the constant is an object or array, the properties or elements of that object/array can still be modified
const myArray = [5, 7, 9];
myArray.push(8); // Modifies the contents of the array
console.log(myArray); // Outputs: [5, 7, 9, 8]


    // Scope determines the accessibility of variables in different parts of the code.
    // Variables declared with var are function-scoped, while those declared with let and const are block-scoped.

    /*
        When you declare a variable outside of any function, it is called a global variable, 
        because it is available to any other code in the current document. When you declare a variable within a function, it is called a local variable, 
        because it is available only within that function.
    */
   

// Variable Scope:  

    /*

    * Global Scope:
    * Variables declared outside of any function or block are globally scoped.
    * If declared outside of any function, they are globally scoped.
    * They can be accessed from anywhere in the code.
    * In a browser environment, global variables become properties of the window object.
    * In Node.js, global variables become properties of the global object.
    * 
    * 
    * Module Scope:
    * In ES6 modules, variables declared at the top level of a module are scoped to that module and are not accessible from other modules unless explicitly exported.
    * 
    * 
    * Function Scope (var): 
    * Variables declared with var are accessible throughout the entire function in which they are declared.
    * 
    * 
    * Block Scope (let and const):
    * Variables declared with let and const are only accessible within the block (enclosed by curly braces {}) in which they are declared.  
    * Examples of blocks include functions, loops, and conditional statements.
    * 
    * 
    * Lexical Scope:
    * JavaScript uses lexical scoping, meaning that the scope of a variable is determined by its position in the source code.
    * Inner functions have access to variables declared in their outer functions.
    * 
    * 
    * Hoisting:
    * Variable declarations (but not initializations) are hoisted to the top of their scope.
    * Variables declared with var are hoisted to the top of their function scope.
    * Variables declared with let and const are hoisted to the top of their block scope but are not initialized until their declaration is evaluated.
    * 
    * Temporal Dead Zone (TDZ):
    * Variables declared with let and const are in a "temporal dead zone" from the start of the block until the declaration is encountered.
    * Accessing them before their declaration results in a ReferenceError.
   */
   

 

    if (Math.random() > 0.5) {
        var globalVar = "I am a global variable (var)";
        let blockVar = "I am a block-scoped variable (let)";
        const blockConst = "I am a block-scoped constant (const)";
    }
    //console.log(globalVar); // Accessible here, will print: I am a global variable (var)
    //console.log(blockVar); // Unaccessible here, will throw ReferenceError
    //console.log(blockConst); // Unaccessible here, will throw ReferenceError 


    function varScopeExample() {
        if (true) {
            var functionScopedVar = "I am function-scoped";
            let blockScopedLet = "I am block-scoped (let)";
            const blockScopedConst = "I am block-scoped (const)";
        }   
    }
    varScopeExample();
    console.log(functionScopedVar); // Accessible here, will print: I am function-scoped
    //console.log(blockScopedLet); // Unaccessible here, will throw ReferenceError
    //console.log(blockScopedConst); // Unaccessible here, will throw ReferenceError


    function lexicalScopeExample() {
        let outerVar = "I am from the outer function";
        function innerFunction() {
            console.log(outerVar); // Accessible here, will print: I am from the outer function
        }
        innerFunction();
    }
    lexicalScopeExample();
    //console.log(outerVar); // Unaccessible here, will throw ReferenceError


    //However, variables created with var are not block-scoped, but only local to the function (or global scope) that the block resides within.

    if(true) {
        var functionVar = "I am function-scoped (var)";
        var n = 100;
    }
    console.log(functionVar); // Accessible here, will print: I am function-scoped (var)
    console.log(n); // Accessible here, will print: 100


    // Variable hoisting

    /*
    * Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compilation phase, before the code is executed.
    * This means that you can use variables and functions before they are declared in the code.
    * However, only the declarations are hoisted, not the initializations.
    * Variables declared with var are hoisted to the top of their function scope and initialized with undefined.
    * Variables declared with let and const are hoisted to the top of their block scope but are not initialized, leading to a "temporal dead zone" until the declaration is encountered.
    */
    console.log(hoistedVar); // Outputs: undefined (declaration is hoisted, but not the initialization)

    var hoistedVar = "I am hoisted";
    console.log(hoistedVar); // Outputs: I am hoisted

    console.log(n === undefined); // Outputs: true (declaration is hoisted, but not the initialization)

    let n = 50;
    console.log(n); // Outputs: 50

    (function(){
        console.log(n); // undefined
        var n = 200; // local value 
        console.log(n); // 200 // local scope
    })();

    

    // The above examples will be interpreted the same as:

    var n;
    console.log(n === undefined); // true
    n = 50;
    (function () {
        var n;
        console.log(n); // undefined
        n = 200;
        console.log(n); // 200
    }());


    /* 
        Whether let and const are hoisted is a matter of definition debate. 
        Referencing the variable in the block before the variable declaration always results in a ReferenceError, 
        because the variable is in a "temporal dead zone" from the start of the block until the declaration is processed. 
    */

    console.log(p); // ReferenceError: Cannot access 'p' before initialization
    let p = 10;
    console.log(p); // Outputs: 10

    console.log(q); // ReferenceError: Cannot access 'q' before initialization
    const q = 20;
    console.log(q); // Outputs: 20

    
    /* 
        Best Practices for Variable Declarations:
        Use let and const instead of var to avoid issues with hoisting and scope.
        Prefer const for variables that won't be reassigned to signal intent and improve code readability.
        Use descriptive variable names that convey the purpose of the variable.
        Declare variables as close to their first use as possible to improve code clarity.
        Avoid using global variables to minimize potential naming conflicts and unintended side effects.
        Consistently follow a coding style guide for variable declarations and naming conventions.  

        Because of hoisting, all var statements in a function should be placed as near to the top of the function as possible. This best practice increases the clarity of the code. 
    */

// Global Variables: 
    //Global variables are in fact properties of the global object.   

    var globalVar_A = "I am a global variable (var)";
    let globalVar_B = "I am a global variable (let)";
    const GLOBAL_CONST = "I am a global constant (const)";
    console.log(window.globalVar_A); // Outputs: I am a global variable (var)
    console.log(window.globalVar_B); // Outputs: undefined
    console.log(window.GLOBAL_CONST); // Outputs: undefined
    console.log(global.globalVar_A); // Outputs: I am a global variable (var)
    console.log(global.globalVar_B); // Outputs: undefined
    console.log(global.GLOBAL_CONST); // Outputs: undefined
    console.log(globalVar_A); // Outputs: I am a global variable (var)
    console.log(globalVar_B); // Outputs: I am a global variable (let)
    console.log(GLOBAL_CONST); // Outputs: I am a global constant (const)

    // Const : You can create a read-only, named constant with the const keyword

    /* 
        A constant cannot change value through assignment or be re-declared while the script is running. 
        It must be initialized to a value. The scope rules for constants are the same as those for let block-scope variables. 

        You cannot declare a constant with the same name as a function or variable in the same scope. 
    */


    const DAYS_IN_WEEK = 7;
    const MAX_USERS = 100;

    console.log(DAYS_IN_WEEK); // Outputs: 7
    console.log(MAX_USERS); // Outputs: 100
    
    // DAYS_IN_WEEK = 8; // TypeError: Assignment to constant variable. (will throw an error if uncommented)
    // MAX_USERS = 150; // TypeError: Assignment to constant variable. (will throw an error if uncommented)     

    /* 
        Note: While the value of a constant variable cannot be changed, if the constant is an object or array, the properties or elements of that object/array can still be modified.

        However, const only prevents re-assignments, but doesn't prevent mutations. 
        The properties of objects assigned to constants are not protected, so the following statement is executed without problems.

     */

    const CONFIG = {
        apiUrl: "https://api.example.com",
        timeout: 5000
    };

    CONFIG.timeout = 10000; // Modifies the property of the object
    console.log(CONFIG.timeout); // Outputs: 10000

    const PERSON = {
        name: "John",
        age: 30
    };

    PERSON.age = 31; // Modifies the property of the object
    console.log(PERSON.age); // Outputs: 31 

    // However, the following line would throw an error:
    // PERSON = { name: "Jane", age: 25 }; // TypeError: Assignment to constant variable. (will throw an error if uncommented)

    // Also, the contents of an array are not protected, so the following statement is executed without problems.

    const FRUITS = ["apple", "banana", "cherry"];
    FRUITS.push("date"); // Modifies the contents of the array
    console.log(FRUITS); // Outputs: ["apple", "banana", "cherry", "date"]

    const MY_ARRAY = ["HTML", "CSS"];
    MY_ARRAY.push("JAVASCRIPT");
    console.log(MY_ARRAY); // ['HTML', 'CSS', 'JAVASCRIPT'];