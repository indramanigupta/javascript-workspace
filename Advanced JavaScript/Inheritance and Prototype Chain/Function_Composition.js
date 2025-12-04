// -------------------- Function Composition --------------------

// Function composition is a functional programming technique where multiple
// functions are combined to produce a new function. The output of one function
// becomes the input of the next. This allows for building complex operations
// from simpler functions.

// Example 1: Simple function composition
function compose(...fns) {
  return function (initialValue) {
    return fns.reduceRight((value, fn) => fn(value), initialValue);
  };
}

const add1 = (x) => x + 1;
const mul2 = (x) => x * 2;
const addThenMul = compose(mul2, add1); // mul2(add1(x))
console.log('compose(mul2, add1)(5) =', addThenMul(5)); // (5+1)*2 = 12
// Example 2: Pipe (left-to-right composition)
function pipe(...fns) {
  return function (initialValue) {
    return fns.reduce((value, fn) => fn(value), initialValue);
  };
}

const mulThenAdd = pipe(mul2, add1); // add1(mul2(x))
console.log('pipe(mul2, add1)(5) =', mulThenAdd(5)); // (5*2)+1 = 11
// Example 3: Currying (transforming functions to accept arguments one at a time)
function curry(fn) {
  return function curried(...args) {    
    if (args.length >= fn.length) {
        return fn.apply(this, args);
    }
    return function (...more) {
      return curried.apply(this, args.concat(more));
    }   
    };  
}

const add = (a, b) => a + b;
const curriedAdd = curry(add);
const addFive = curriedAdd(5);
console.log('addFive(10) =', addFive(10)); // 15

// Example 4: Composing functions with multiple arguments
// Helper to lift a function to accept the output of another
function lift(fn) { 
    return function (g) {   
        return function (...args) {
            return fn(g(...args));
        };
    }
}

const sum = (a, b) => a + b;
const double = (n) => n * 2;
const doubleSum = lift(double)(sum);
console.log('doubleSum(2,3) =', doubleSum(2, 3)); // (2+3)*2 = 10

// Example 5: Composing asynchronous functions that return promises 

function composeAsync(...fns) {
  return function (arg) {
    return fns.reduceRight((p, fn) => p.then(fn), Promise.resolve(arg));
  };
}

const asyncAdd1 = async (n) => n + 1;
const asyncMul2 = async (n) => n * 2;   

const composedAsync = composeAsync(asyncMul2, asyncAdd1); // asyncMul2(asyncAdd1(x))
composedAsync(5).then((res) => console.log('composedAsync result =', res)); // (5+1)*2 = 12

// Alternatively a pipeAsync (left-to-right)
function pipeAsync(...fns) {
  return function (arg) {
    return fns.reduce((p, fn) => p.then(fn), Promise.resolve(arg));
  };
}   

const pipedAsync = pipeAsync(asyncAdd1, asyncMul2); // asyncMul2(asyncAdd1(x))
pipedAsync(5).then((res) => console.log('pipedAsync result =', res)); // (5+1)*2 = 12

// Summary:
// - Function composition allows building complex operations from simpler functions
// - compose() combines functions right-to-left, pipe() left-to-right
// - Currying transforms functions to accept arguments one at a time
// - lift() helps compose functions with multiple arguments
// - composeAsync() and pipeAsync() enable composing async functions returning promises
// Applications:
// - Data transformation pipelines
// - Middleware chaining (e.g., in web frameworks)
// - Building reusable and modular code components

// Useful for:
// - Data processing pipelines
// - Middleware in web frameworks
// - Event handling chains

// -------------------- Await Function -------------------- 

