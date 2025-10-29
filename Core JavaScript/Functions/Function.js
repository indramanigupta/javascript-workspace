// Function

/* A function is a block of code designed to perform a particular task.
It is executed when "something" invokes it (calls it). */

/* 

A function definition (also called a function declaration, or function statement) consists of the function keyword, followed by:

The name of the function.
A list of parameters to the function, enclosed in parentheses and separated by commas.
The JavaScript statements that define the function, enclosed in curly braces, 

Calling functions:
Defining a function does not execute it. Defining it names the function and specifies what to do when the function is called.

Calling the function actually performs the specified actions with the indicated parameters. 

*/


function greet(name) {
    return "Hello, " + name + "!";
}


function add(a, b) {
    return a + b;
}

function square(x) {
    return x * x;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }   
    return n * factorial(n - 1);
}


function isEven(num) {
    return num % 2 === 0;
}


// Passing Objects to Functions

/* When an object is passed to a function, what is actually passed is a reference to that object.
This means that if the function modifies the object's properties, those changes will be reflected outside the function as well. 

Parameters are essentially passed to functions by value — so if the code within the body of a function assigns a completely new value to a parameter that was passed to the function, 
the change is not reflected globally or in the code which called that function.


When you pass an object as a parameter, if the function changes the object's properties, that change is visible outside the function
but if the function assigns a new object to that parameter, the change is not visible outside the function.
*/

function getCarInfo(Car) {
    Car.make = "Toyota";
    Car.model = "Camry";
    Car.year = 2020;
}

const myCar = { 
    make: "Honda", 
    model: "Civic", 
    year: 2018
};

console.log(myCar); 
// Output: { make: 'Honda', model: 'Civic', year: 2018 }

getCarInfo(myCar);

console.log(myCar); 
// Output: { make: 'Toyota', model: 'Camry', year: 2020 }
// The properties of the object have been modified by the function.
// However, if we were to reassign the parameter to a new object, it would not affect the original object.

function reassignCar(Car) {
    Car = { make: "Ford", model: "Focus", year: 2019 };
}  

console.log(myCar); 
// Output: { make: 'Toyota', model: 'Camry', year: 2020 }
reassignCar(myCar);
console.log(myCar); 
// Output: { make: 'Toyota', model: 'Camry', year: 2020 }
// The original object remains unchanged.


/*

When you pass an array as a parameter, if the function changes any of the array's values, that change is visible outside the function, as shown in the following example:

*/

function modifyArray(arr) {
    arr[0] = 100;
    arr.push(4);
}

const myArray = [1, 2, 3];
console.log(myArray); 
// Output: [1, 2, 3]
modifyArray(myArray);
console.log(myArray); 
// Output: [100, 2, 3, 4]
// The array has been modified by the function.


/*
However, if the function assigns a new array to that parameter, the change is not visible outside the function, as shown in the following example:
*/

function reassignArray(arr) {
    arr = [10, 20, 30];
}   

console.log(myArray);
// Output: [100, 2, 3, 4]
reassignArray(myArray);
console.log(myArray); 
// Output: [100, 2, 3, 4]
// The original array remains unchanged.

// Function declarations and expressions can be nested, which forms a scope chain. For example:

function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}
console.log(addSquares(2, 3)); // Output: 13

// Function Expressions

/* A function expression is similar to a function declaration, but instead of being declared as a separate statement, 
it is defined as part of a larger expression syntax (typically a variable assignment). */

const add = function(a, b) {
  return a + b;
};

console.log(add(2, 3)); // Output: 5
// Function expressions can be anonymous (without a name) or named.

const factorialFunc = function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n < 2 ? 1 : n * factorial(n - 1);
};
console.log(factorialFunc(5)); // Output: 120


//Function expressions are convenient when passing a function as an argument to another function. For example:

function map(f, a) {
  const result = new Array(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = f(a[i]);
  }
  return result;
}

const numbers = [0, 1, 2, 5, 10];
const cubedNumbers = map(function (x) {
  return x * x * x;
}, numbers);
console.log(cubedNumbers); // [0, 1, 8, 125, 1000]

setTimeout(function() {
  console.log("This message is displayed after 2 seconds");
}, 2000);


//  A function can be defined based on a condition. For example,
let myFunct;
const condition = true;
if (condition) {
  myFunct = function() {
    return "Condition is true!";
  };
} else {
  myFunct = function() {
    return "Condition is false!";
  };
}
console.log(myFunct()); // Output: "Condition is true!"



// Arrow Functions

/* Arrow functions provide a more concise syntax for writing function expressions.
They are often used for short functions or when you want to preserve the context of 'this' from the surrounding code. */

const addArrow = (a, b) => a + b;

console.log(addArrow(2, 3)); // Output: 5
const squareArrow = x => x * x;

console.log(squareArrow(4)); // Output: 16


// Recursive Functions

/* A recursive function is a function that calls itself in order to solve a problem.
Recursive functions typically have a base case that stops the recursion and a recursive case that continues the recursion. */

function factorialRecursive(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return ( n < 2 ? 1 : n * factorialRecursive(n - 1));
}


// Example: Fibonacci Sequence

function fibonacci(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(6)); // Output: 8




// Immediately Invoked Function Expressions (IIFE)

// IIFEs are often used to create a new scope and avoid polluting the global namespace.
// They can also be used to initialize variables or perform setup tasks immediately.

(function() {
    console.log("This is an IIFE");
})();
// Output: This is an IIFE


// IIFE with parameters
(function(name) {
    console.log("Hello, " + name + "!");
})("Alice");
// Output: Hello, Alice!


// Function hoisting only works with function declarations — not with function expressions. The following code will not work:

console.log(subtract(5, 3)); // Error: subtract is not defined

const subtract = function(a, b) {
  return a - b;
};
// To fix this, you need to define the function before calling it:

const subtractFixed = function(a, b) {
  return a - b;
};
console.log(subtractFixed(5, 3)); // Output: 2


/* 
Function scopes and closures:


Functions form a scope for variables—this means variables defined inside a function cannot be accessed from anywhere outside the function. 
The function scope inherits from all the upper scopes. For example, a function defined in the global scope can access all variables defined in the global scope. 
A function defined inside another function can also access all variables defined in its parent function, and any other variables to which the parent function has access.

On the other hand, the parent function (and any other parent scope) does not have access to the variables and functions defined inside the inner function. 
This provides a sort of encapsulation for the variables in the inner function.

*/

const number = 10; // Global scope
const number2 = 20; // Global scope
const name = "Global"; // Global scope

// This function is defined in the global scope
function multiplyByTwo(x) {
    return x * 2 + number2; // Accessing global variable 'number2'
}

console.log(multiplyByTwo(5)); // Output: 30

// A nested function example
function getScore() {
    const score = 100; // Local scope of getScore
    function displayScore() {
        console.log("Score:", score);
    }
    displayScore();
}

getScore(); // Output: Score: 100   
// The inner function 'displayScore' can access the variable 'score' defined in its parent function 'getScore'.
// However, 'getScore' cannot access variables defined in 'displayScore'.

// Closure example :  function body as a closure.


// Closure example: A closure is created when a function is defined inside another function, allowing the inner function to access variables from the outer function's scope even after 
// the outer function has finished executing.

const pet = function(name) {
    const getName = function() {
        // Accessing the 'name' parameter from the outer function 'pet'
        return name; 
    };
    return getName; // Returning the inner function, thereby exposing it to outer scopes which forms a closure.

}
const myPet = pet("Buddy");
console.log(myPet()); // Output: Buddy
// The inner function 'getName' forms a closure that captures the 'name' parameter from the outer function 'pet'.


//It can be much more complex than the code above. An object containing methods for manipulating the inner variables of the outer function can be returned.

const createPerson = function(firstName, lastName) {
    let sex;
    const person = {
        setName(newName) {
            const nameParts = newName.split(" ");
            firstName = nameParts[0];
            lastName = nameParts[1];
        },
        getName() {
            return firstName + " " + lastName;
        },
        setSex(newSex) {
            if(typeof newSex !== 'string' || (newSex.toLowerCase() === 'male' || newSex.toLowerCase() === 'female')) {
                sex = newSex;
            }
        },
        getSex() {
            return sex;
        }

    };
    return person;
}

const person1 = createPerson("John", "Tope");
console.log(person1.getName());  // Output: John Tope
person1.setName("Jane Smith");
console.log(person1.getName());  // Output: Jane Smith
person1.setSex("Female");
console.log(person1.getSex());   // Output: Female

// In the code above, the firstName, lastName variable of the outer function is accessible to the inner functions, 
// and there is no other way to access the inner variables except through the inner functions.
// The inner variables of the inner functions act as safe stores for the outer arguments and variables. They hold "persistent" and "encapsulated" data for the inner functions to work with. 
// The functions do not even have to be assigned to a variable, or have a name.

// Another Closure Example: Counter

function createCounter() {
    let count = 0; // Private variable
    return function() {
        count++;
        console.log("Count:", count);
    };
}

const counter = createCounter();
counter(); // Output: Count: 1
counter(); // Output: Count: 2
counter(); // Output: Count: 3



// Name conflicts: 
/* When two arguments or variables in the scopes of a closure have the same name, there is a name conflict. 
More nested scopes take precedence. So, the innermost scope takes the highest precedence, while the outermost scope takes the lowest. 
This is the scope chain. The first on the chain is the innermost scope, and the last is the outermost scope. */

function outerFunction() {
    const value = "Outer Value";    
    function innerFunction() {
        const value = "Inner Value";
        console.log(value); // Output: Inner Value
    }
    innerFunction();
    console.log(value); // Output: Outer Value  
}
outerFunction();
// In the example above, both the outerFunction and innerFunction have a variable named value.
// When innerFunction accesses value, it refers to its own variable (Inner Value) due to the scope chain.
// When outerFunction accesses value, it refers to its own variable (Outer Value).  
// If innerFunction did not have its own value variable, it would access the value variable from outerFunction (Outer Value).



// Named Function Expressions and Recursion

/* Named function expressions can be useful for recursion, as they allow the function to refer to itself by name even when assigned to a variable. */   
const factorialNamed = function fact(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * fact(n - 1);
};
console.log(factorialNamed(5)); // Output: 120
// In this example, the named function expression fact allows the function to call itself recursively, even though it is assigned to the variable factorialNamed.