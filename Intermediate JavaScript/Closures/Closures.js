// Closures
// --------
// A closure is a function that has access to variables from its enclosing scope,
// even after that scope has finished executing. This happens because functions
// in JavaScript form closures around the data they need.

// In JavaScript, closures are created every time a function is created, 
// at function creation time.

// Definition & How It Works
// -------------------------
// When a function is created, it maintains a reference to its lexical scope
// (the scope in which it was declared). This lexical scope includes all variables
// from outer functions and the global scope. Even after the outer function returns,
// the inner function can still access those variables.

// Example 1: Basic Closure - Private Counter
function makeCounter() {
  let count = 0; // private variable
  return function increment() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// `count` is only accessible through the returned function, creating private state

// Example 2: Multiple Closures Sharing Scope
function makeCounter2() {
  let count = 0;
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getCount() { return count; }
  };
}

const counter2 = makeCounter2();
console.log('\nMultiple closures sharing state:');
console.log('increment:', counter2.increment()); // 1
console.log('increment:', counter2.increment()); // 2
console.log('decrement:', counter2.decrement()); // 1
console.log('getCount:', counter2.getCount()); // 1

// Example 3: Closure with Function Parameters
function makeGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = makeGreeter('Hello');
const sayHi = makeGreeter('Hi');
console.log('\nClosures with parameters:');
console.log(sayHello('Alice')); // Hello, Alice!
console.log(sayHi('Bob'));     // Hi, Bob!

// Example 4: Loop and Closures (Common Pitfall)
console.log('\nLoop closure pitfall and solution:');

// Problem: var loses the loop variable
function problemLoopVar() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push(() => i);
  }
  return funcs;
}

const problemFuncs = problemLoopVar();
console.log('Problem with var (all print same value):');
problemFuncs.forEach((f, idx) => console.log(`  funcs[${idx}]():`, f())); // all return 3

// Solution 1: use let (block scope)
function solutionLet() {
  const funcs = [];
  for (let i = 0; i < 3; i++) {
    funcs.push(() => i);
  }
  return funcs;
}

const letFuncs = solutionLet();
console.log('Solution with let (each captures its own i):');
letFuncs.forEach((f, idx) => console.log(`  funcs[${idx}]():`, f())); // 0, 1, 2

// Solution 2: IIFE (immediately invoked function expression)
function solutionIIFE() {
  const funcs = [];
  for (var i = 0; i < 3; i++) {
    funcs.push((function(j) {
      return () => j;
    })(i));
  }
  return funcs;
}

const iifeFuncs = solutionIIFE();
console.log('Solution with IIFE (captures each iteration):');
iifeFuncs.forEach((f, idx) => console.log(`  funcs[${idx}]():`, f())); // 0, 1, 2

// Example 5: Module Pattern (Encapsulation)
// Closures enable the Module Pattern for creating private and public interfaces
const Calculator = (function() {
  // Private variables
  let lastResult = 0;
  
  // Private function
  function log(value) {
    console.log(`  [log] ${value}`);
    lastResult = value;
  }
  
  // Public API
  return {
    add(a, b) {
      const result = a + b;
      log(`${a} + ${b} = ${result}`);
      return result;
    },
    multiply(a, b) {
      const result = a * b;
      log(`${a} * ${b} = ${result}`);
      return result;
    },
    getLastResult() {
      return lastResult;
    }
  };
})();

console.log('\nModule pattern (private state):');
Calculator.add(5, 3);        // uses private log function
Calculator.multiply(4, 2);   // uses private log function
console.log('Last result:', Calculator.getLastResult()); // 8

// Example 6: Function Factory (Creating Customized Functions)
function makeMultiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
console.log('\nFunction factory:');
console.log('double(5):', double(5));   // 10
console.log('triple(5):', triple(5));   // 15

// Example 7: Callback Functions (Event Handlers, Async)
function setupListeners(ids) {
  return ids.map(id => {
    return function() {
      console.log(`  Listener called for id: ${id}`);
    };
  });
}

const listeners = setupListeners(['btn1', 'btn2', 'btn3']);
console.log('\nCallback with closures (simulating event listeners):');
listeners[0]();
listeners[1]();
listeners[2]();

// Example 8: Memoization (Caching Function Results)
function createMemoizedAdd() {
  const cache = {}; // private cache
  
  return function(a, b) {
    const key = `${a},${b}`;
    if (key in cache) {
      console.log(`  [cache hit] ${key}`);
      return cache[key];
    }
    console.log(`  [computing] ${a} + ${b}`);
    const result = a + b;
    cache[key] = result;
    return result;
  };
}

const memoAdd = createMemoizedAdd();
console.log('\nMemoization with closures:');
console.log('memoAdd(2, 3):', memoAdd(2, 3)); // computing
console.log('memoAdd(2, 3):', memoAdd(2, 3)); // cache hit
console.log('memoAdd(5, 7):', memoAdd(5, 7)); // computing
console.log('memoAdd(5, 7):', memoAdd(5, 7)); // cache hit

// Why Use Closures?
// -----------------
// 1. Encapsulation: Create private variables and methods
// 2. Data persistence: Maintain state across function calls
// 3. Function factories: Generate customized functions with preset parameters
// 4. Callback handlers: Bind context to async/event operations
// 5. Memoization: Cache expensive computations
// 6. Module pattern: Organize code into logical units with public/private APIs

// When to Use Closures
// --------------------
// - When you need private state: Use closures instead of global variables
// - Creating decorators/higher-order functions: Functions that return functions
// - Event handlers and callbacks: Preserve context and data for async operations
// - Currying and partial application: Create specialized versions of functions
// - Stateful transformations: Maintain intermediate state during processing

// Common Pitfalls
// ---------------
// 1. Unintended memory retention: Closures hold references to outer scope,
//    preventing garbage collection. Be mindful of large objects.
// 2. Loop variable capture (solved with let/const or IIFE)
// 3. This binding: closures don't change the value of `this`; use arrow functions if needed.

// Best Practices
// ---------------
// - Use `const`/`let` with block scope instead of `var` to avoid closure pitfalls
// - Name inner functions descriptively for readability
// - Document which variables are being captured in closures
// - Avoid capturing large objects unnecessarily
// - Consider using arrow functions for consistent `this` binding in closures