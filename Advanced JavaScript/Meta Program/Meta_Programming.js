// Meta programming:
// Meta programming is a programming technique where programs have the ability to treat other programs
// as their data. This means that a program can be designed to read, generate, analyze or transform other
// programs, and even modify itself while running. Meta programming allows for more dynamic and flexible
// code, enabling developers to create abstractions, automate repetitive tasks, and implement advanced
// patterns like decorators, proxies, and code generation.


// Key Meta Programming Features in JavaScript:

// 1. Proxies:
// Proxies allow you to create a wrapper for an object that can intercept and redefine fundamental operations
// for that object, such as property access, assignment, enumeration, function invocation, etc.
const target = { message: "Hello, World!" };
const handler = {
  get: function(obj, prop) {    
    console.log(`Getting property: ${prop}`);
    return prop in obj ? obj[prop] : "Property does not exist";
  }
};


const proxy = new Proxy(target, handler);
console.log(proxy.message);

// Handlers and traps

// handler.getPrototypeOf()
// handler.set()
// handler.deleteProperty()
// handler.apply()
// handler.construct()
// handler.ownKeys()


// Revocable Proxy:

const revocable = Proxy.revocable(target, handler);
console.log(revocable.proxy.message);
revocable.revoke();
// console.log(revocable.proxy.message); // Throws TypeError: Cannot perform 'get' on a revoked proxy   




// 2. Reflect API:
// The Reflect API provides methods for interceptable JavaScript operations. It is often used in conjunction
// with Proxies to perform default behavior after intercepting operations.
// Reflect is not a function object. 
// Reflect helps with forwarding default operations from the handler to the target.

const obj = { x: 10, y: 20 };
console.log(Reflect.get(obj, 'x'));

Reflect.has(Object, "assign"); // true


Reflect.apply(Math.floor, undefined, [1.75]);
// 1

Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]);
// "hello"

Reflect.apply(RegExp.prototype.exec, /ab/, ["confabulation"]).index;
// 4

Reflect.apply("".charAt, "ponies", [3]);
// "i"


// Checking if property definition has been successful

if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}


// 3. Decorators (Experimental):
// Decorators are a proposed feature (not yet standard) that allow you to modify classes and class members
// using special annotations. They can be used for logging, access control, memoization, etc.

function log(target, name, descriptor) {
  const original = descriptor.value;
    descriptor.value = function(...args) {
    console.log(`Calling ${name} with arguments: ${args}`);
    return original.apply(this, args);
  }
    return descriptor;
}

