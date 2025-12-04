// Memory Management in JavaScript:
// JavaScript uses automatic memory management through a process called garbage collection.
// This means that developers do not need to manually allocate and free memory as in some other languages.
// However, understanding how memory management works can help write more efficient code and avoid memory leaks.
// Key Concepts:

// 1. Memory Allocation:
//    - Primitive types (number, string, boolean, null, undefined, symbol) are stored directly in the stack.
//    - Objects and functions are stored in the heap, with references held in the stack.

// 2. Garbage Collection:
//    - JavaScript uses a garbage collector to automatically reclaim memory that is no longer in use.
//    - The most common algorithm is Mark-and-Sweep, which identifies objects that are no longer reachable from the root (global scope, local scopes, etc.) and frees their memory.

// 3. Avoiding Memory Leaks:
//    - Unintentional global variables: Always declare variables with var, let, or const.
//    - Closures: Be cautious with closures that may hold references to large objects.
//    - DOM references: Remove event listeners and DOM references when they are no longer needed.
//    - Timers: Clear intervals and timeouts when they are no longer necessary.

// 4. Best Practices:
//    - Use local variables to limit scope and lifetime.
//    - Nullify references to large objects when done.
//    - Monitor memory usage using browser developer tools.
//    - Optimize data structures for memory efficiency (e.g., use Maps/Sets when appropriate).


/**
 * 
 *  Regardless of the programming language, 
 *  the memory life cycle is pretty much always the same:
 *   Allocate the memory you need
 *   Use the allocated memory (read, write)
 *   Release the allocated memory when it is not needed anymore
 */


// Example: Simple Memory Management Demonstration
function createLargeArray() {
  const largeArray = new Array(1e6).fill('some data');
    return largeArray;
}

let myArray = createLargeArray();
console.log('Large array created.');

// After using the array, nullify the reference to allow garbage collection
myArray = null;
console.log('Reference to large array removed.');

// Note: Actual memory reclamation will be handled by the garbage collector at its own discretion.

// Summary:
// - JavaScript handles memory management automatically via garbage collection.
// - Understanding memory allocation and garbage collection helps avoid memory leaks.
// - Follow best practices to write memory-efficient code.


// Allocation in JavaScript:

// Primitive types are stored in the stack
let num = 42;
let str = 'Hello, World!';
let bool = true;

// Objects and functions are stored in the heap
let obj = { name: 'Alice', age: 30 };
function greet() {
  console.log('Hello!');
}

// References to objects/functions are stored in the stack
let anotherObj = obj; // anotherObj references the same object as obj

// When obj is set to null, the object remains in memory as anotherObj still references it
obj = null; // The object is not garbage collected yet
console.log('anotherObj still exists:', anotherObj);

// When anotherObj is also set to null, the object becomes unreachable and eligible for garbage collection
anotherObj = null; // Now the object can be garbage collected
console.log('anotherObj reference removed.');   

/*
// Generators in JavaScript:
// A generator is a special type of function that can pause its execution and 
// resume later, maintaining its context (state) between pauses. 
// Generators are defined using the function* syntax and use the yield keyword to produce values.   
// Generators return an iterator object that conforms to the iterator protocol, 
// which means it has a next() method that returns an object with value and done properties.
*/


// Example: Simple Generator Function
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}   

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }   

// Generators are iterable
for (const value of simpleGenerator()) {
  console.log('Generator value:', value);
}

// Example: Generator with Parameters
function* rangeGenerator(start = 0, end = 5) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
console.log('Range generator:');
for (const num of rangeGenerator(3, 7)) {
  console.log(num); // 3, 4, 5, 6, 7
}

// Example: Generator with Two-Way Communication
function* accumulator() {
  let total = 0;
    while (true) {
    const value = yield total;
    if (value === undefined) break;
    total += value;
  }
    return total;
}

const accGen = accumulator();
console.log(accGen.next()); // { value: 0, done: false }
console.log(accGen.next(5)); // { value: 5, done: false }
console.log(accGen.next(10)); // { value: 15, done: false }
console.log(accGen.next()); // { value: undefined, done: true } (final return value)

// Summary:
// - Generators allow pausing and resuming function execution while maintaining state.
// - They are defined with function* and use yield to produce values.
// - Generators return an iterator object that can be iterated over using next() or for...of loops.
// - They can also receive input via next(value), enabling two-way communication.
// Example: Composing Functions and Promises
// --------------------------------------------------
// Currying: Transforming a function with multiple arguments into a sequence of functions each taking a single argument

const curriedAdd = (a) => (b) => a + b;
const addFive = curriedAdd(5);
console.log('addFive(10) =', addFive(10)); // 15    

// --------------------------------------------------------------------
// Composing synchronous functions with multiple args
// Helper to lift a function to accept the output of another
const lift = (fn) => (g) => (...args) => fn(g(...args));
const sum = (a, b) => a + b;
const double = (n) => n * 2;
const doubleSum = lift(double)(sum); // double(sum(a,b))
console.log('doubleSum(2,3) =', doubleSum(2, 3)); // (2+3)*2 = 10

// --------------------------------------------------------------------

// Promise composition (composing async functions)
// A small composeAsync that chains functions returning promises
const composeAsync = (...fns) => (arg) => fns.reduceRight((p, f) => p.then(f), Promise.resolve(arg));
const asyncAdd1 = async (n) => n + 1;
const asyncMul2 = async (n) => n * 2;
const composedAsync = composeAsync(asyncMul2, asyncAdd1); // asyncMul2(asyncAdd1(x))
composedAsync(5).then((res) => console.log('composedAsync result =', res)); // (5+1)*2 = 12

// Alternatively a pipeAsync (left-to-right)
const pipeAsync = (...fns) => (arg) => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
const pipedAsync = pipeAsync(asyncAdd1, asyncMul2); // asyncMul2(asyncAdd1(x))
pipedAsync(5).then((res) => console.log('pipedAsync result =', res)); // (5+1)*2 = 12
// --------------------------------------------------------------------

// Middleware-style composition (Koa-like)
// Each middleware receives context and next(), returns a Promise
function composeMiddleware(middlewares) {
  return function (ctx) {
    let index = -1;
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
        const fn = middlewares[i];
        if (!fn) return Promise.resolve();
        try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
        } catch (err) {
        return Promise.reject(err);
        }
    }
    return dispatch(0);
  };
}

// Example middleware functions
const mw1 = async (ctx, next) => {
  console.log('mw1: before');
  await next();
  console.log('mw1: after');
};
const mw2 = async (ctx, next) => {
  console.log('mw2: before');
  await next();
  console.log('mw2: after');
};
const mw3 = async (ctx, next) => {
  console.log('mw3: processing');
  await next();
};  
const composed = composeMiddleware([mw1, mw2, mw3]);
const ctx = {};
composed(ctx).then(() => console.log('All middleware complete.'));
// --------------------------------------------------------------------

// Example 4: Closure with IIFE to Capture Loop Variable
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


// Example 3: Closure with let to Capture Loop Variable
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
// Example 1: Basic Memoization with Closure
function memoize(fn) {
  const cache = {}; 
    return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log(`  [cache hit] ${key}`);
      return cache[key];
    }
    console.log(`  [computing] ${fn.name}(${args.join(', ')})`);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Expensive function: factorial
function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

const memoFactorial = memoize(factorial);
console.log('Basic Memoization:');
console.log('factorial(5):', memoFactorial(5)); // computing
console.log('factorial(5):', memoFactorial(5)); // cache hit
console.log('factorial(6):', memoFactorial(6)); // computing (needs 6)
console.log('factorial(6):', memoFactorial(6)); // cache hit  


// Example 2: Memoization with Multiple Arguments
function add(a, b) {
  return a + b;
}   

const memoAdd = memoize(add);
console.log('\nMemoization with multiple args:');
console.log('add(2, 3):', memoAdd(2, 3)); // computing  
console.log('add(2, 3):', memoAdd(2, 3)); // cache hit
console.log('add(3, 2):', memoAdd(3, 2)); // computing (different order = different key)


// Example 3: Fibonacci - Classic Use Case
// Without memoization, fibonacci has exponential time complexity O(2^n)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(fibonacci);
console.log('\nFibonacci with memoization:');
console.log('fib(10):', memoFib(10)); // computing many calls
console.log('fib(11):', memoFib(11)); // computing fib(11), but fib(10) cached
console.log('fib(10):', memoFib(10)); // cache hit


// Example 4: Memoization with Custom Cache Key
// For complex objects, JSON.stringify may not work well
function memoizeWithCustomKey(fn, keyGenerator) {
    const cache = {};
    return function(...args) {
    const key = keyGenerator(...args);
    if (key in cache) {
      console.log(`  [cache hit] ${key}`);
      return cache[key];
    }
    console.log(`  [computing] ${fn.name}(${args.join(', ')})`);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}


// Example usage with a custom key generator
function complexFunction(obj) {
  // Simulate an expensive computation
  return Object.keys(obj).length;
}
const customKeyGen = (obj) => Object.keys(obj).sort().map(k => `${k}:${obj[k]}`).join('|');
const memoComplexFunction = memoizeWithCustomKey(complexFunction, customKeyGen);
console.log('\nMemoization with custom key:');
console.log('complexFunction({a:1,b:2}):', memoComplexFunction({a:1,b:2})); // computing
console.log('complexFunction({b:2,a:1}):', memoComplexFunction({b:2,a:1})); // cache hit (same content, different order)
console.log('complexFunction({a:1,b:3}):', memoComplexFunction({a:1,b:3})); // computing (different content)    


// Example 5: Memoization with Expiration (TTL)
function memoizeWithTTL(fn, ttlMs) {
  const cache = new Map();  
    return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    const now = Date.now();
    if (cached && (now - cached.timestamp < ttlMs)) {
      console.log(`  [cache hit] ${key}`);
      return cached.value;
    }
    console.log(`  [computing] ${fn.name}(${args.join(', ')})`);
    const result = fn(...args);
    cache.set(key, { value: result, timestamp: now });
    return result;
  };
}


function expensiveAPI(query) {
  // Simulate an expensive API call
  return `Result for ${query}`;
}

const memoExpensiveAPI = memoizeWithTTL(expensiveAPI, 3000); // 3 seconds TTL
console.log('\nMemoization with TTL:');
console.log('expensiveAPI("test1"):', memoExpensiveAPI("test1")); // computing
console.log('expensiveAPI("test1"):', memoExpensiveAPI("test1")); // cache hit
setTimeout(() => {
  console.log('expensiveAPI("test1") after 4s:', memoExpensiveAPI("test1")); // recomputing (expired)
}, 4000);



// Example 6: Module Pattern (Encapsulation)
// Closures enable the Module Pattern for creating private and public interfaces
const CounterModule = (function() { 
    // Private variable
    let count = 0;
    // Public API
    return {
    increment() {
        count++;
        return count;
    },
    decrement() {
        count--;
        return count;
    },
    getCount() {
        return count;
    }
};
})();

console.log('\nCounter Module:');
console.log('Initial count:', CounterModule.getCount());

console.log('Increment:', CounterModule.increment());
console.log('Increment:', CounterModule.increment());
console.log('Decrement:', CounterModule.decrement());
console.log('Final count:', CounterModule.getCount());

// Note: The internal count variable is not accessible from outside the module,
// ensuring encapsulation and preventing external modification.


// -------------------- WeakMap and WeakSet (advanced) --------------------
// WeakMap: like Map, but keys must be objects and are weakly referenced (not preventing garbage collection)
// WeakSet: like Set, but only objects, weakly referenced

// These are used for memory-sensitive caches or private data in classes
const weakMap = new WeakMap();
const secret = {};
weakMap.set(secret, 'hidden');
console.log('weakMap.get(secret) =', weakMap.get(secret)); // 'hidden'

const weakSet = new WeakSet();
obj = {};
weakSet.add(obj);
console.log('weakSet.has(obj) =', weakSet.has(obj)); // true

// Example: Using WeakMap for Private Data in Classes
class Person {
  constructor(name) {   
    this.name = name;
    // Private data stored in WeakMap
    privateData.set(this, { age: null });
  }
    setAge(age) {
     privateData.get(this).age = age;
    }
    getAge() {
     return privateData.get(this).age;
    }
}

const privateData = new WeakMap();

const alice = new Person('Alice');
alice.setAge(30);
console.log('\nPerson class with private data using WeakMap:');
console.log(`${alice.name} is ${alice.getAge()} years old.`); // Alice is 30 years old.

// When alice is no longer referenced, its private data in WeakMap can be garbage collected

// Note: WeakMap/WeakSet do not prevent their keys from being garbage collected and do not support iteration.

// Summary:
// - Use WeakMap/WeakSet for memory-sensitive caches or private data in classes.
// - They allow objects to be garbage collected when there are no other references.
// - They do not support iteration or methods like size, making them suitable for private storage.


// -------------------- Enumerability --------------------
// - `Object.getOwnPropertyNames(obj)` -> own string keys (enumerable or not)
// - `Object.getOwnPropertySymbols(obj)` -> own symbol keys
// - `Reflect.ownKeys(obj)` -> all own keys (string + symbol, enumerable or not)
// - `Object.getOwnPropertyDescriptor(obj, prop)` -> descriptor including `enumerable`
// - `for (const k in obj)` -> iterates enumerable properties from obj and prototype chain

// Example 1: for...in vs Object.keys vs hasOwnProperty
const proto = { inherited: 1 };
obj = Object.create(proto);
obj.own = 2;

console.log('for...in iteration:');
for (const k in obj) console.log(' ', k);   
console.log('Object.keys:', Object.keys(obj));
console.log('hasOwnProperty(inherited):', Object.prototype.hasOwnProperty.call(obj, 'inherited'));
console.log('hasOwnProperty(own):', Object.prototype.hasOwnProperty.call(obj, 'own'));

// Example 2: define non-enumerable property to hide internal fields
const user = { name: 'Alice', age: 30 };
Object.defineProperty(user, '_internalId', { value: 'id-123', enumerable: false, configurable: true });

console.log('\nUser keys (own enumerable):', Object.keys(user));
console.log('All own property names:', Object.getOwnPropertyNames(user));
console.log('JSON.stringify(user):', JSON.stringify(user));

// Example 3: Symbols are not returned by Object.keys or for...in
const sym = Symbol('secret');
user[sym] = 'hidden';
console.log('\nSymbol keys (Reflect.ownKeys):', Reflect.ownKeys(user));

// Example 4: cloning while preserving enumerability and descriptors
const source = { a: 1 };
Object.defineProperty(source, 'hidden', { value: 'x', enumerable: false, writable: false });

const cloneShallow = Object.assign({}, source); // loses non-enumerables and descriptors
const cloneFull = Object.create(Object.getPrototypeOf(source), Object.getOwnPropertyDescriptors(source));

console.log('\ncloneShallow keys:', Object.keys(cloneShallow));
console.log('cloneFull keys (all own):', Object.getOwnPropertyNames(cloneFull));
console.log('cloneFull descriptor for hidden:', Object.getOwnPropertyDescriptor(cloneFull, 'hidden'));  

// Example 5: copying including symbols and non-enumerables
function deepCloneWithDescriptors(o) {
    return Object.create(Object.getPrototypeOf(o), Object.getOwnPropertyDescriptors(o));
}

const deep = deepCloneWithDescriptors(user);
console.log('\nDeep clone keys:', Reflect.ownKeys(deep));

// Use cases summary (short):
// - Library authors: place methods on prototypes with enumerable: false so instances' enumerations show only data.
// - Serialization control: exclude sensitive or computed fields by setting enumerable: false.
// - Migration/clone utilities: use descriptors to preserve exact property behaviour.

// Best practices
// - Use Object.defineProperty to control enumerability of properties.
// - Use Object.getOwnPropertyDescriptors for cloning objects while preserving property attributes.
// - Be aware of symbol properties when working with object keys and cloning.
// - Use for...in for prototype chain enumeration, Object.keys for own enumerable keys, and Reflect.ownKeys for all own keys.

// -------------------- End of Enumerability --------------------


// Summary:
// - Memory management in JavaScript is automatic via garbage collection.
// - Understanding closures helps in writing efficient and encapsulated code.
// - Generators provide powerful control over function execution and state.
// - Function composition techniques enhance code modularity and reusability.
// - Enumerability controls how object properties are exposed during iteration and serialization.



// Mark-and-sweep algorithm:

// 1. Mark Phase: The garbage collector starts from root references (global objects, local variables in active functions) and marks all reachable objects.
// 2. Sweep Phase: It then scans the heap for unmarked objects and reclaims their memory, making it available for future allocations.   


// WeakRefs and FinalizationRegistry (advanced):
// - WeakRef allows creating weak references to objects, which do not prevent garbage collection.
// - FinalizationRegistry allows registering a callback to be called when an object is garbage collected.   

// -------------------- End of Memory Management --------------------