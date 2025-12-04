// Inheritance with the prototype chain
// Definition & How It Works
// ------------------------------
// In JavaScript, objects can inherit properties and methods from other objects
// through the prototype chain. Each object has an internal link to another object
// called its prototype. When accessing a property, JavaScript first looks for it
// on the object itself; if not found, it looks up the prototype chain until it
// finds the property or reaches the end of the chain (null).

// Why use the prototype chain?
// - Code reuse: Share methods and properties across many objects without duplication
// - Dynamic extension: Add methods to all instances by modifying the prototype
// - Memory efficiency: Methods are stored once on the prototype, not on every instance
// - Built-in inheritance: All objects inherit from Object.prototype by default

// When to use the prototype chain?
// - When you want to share behavior (methods/properties) across many objects
// - When creating constructor functions or ES6 classes
// - When you want to extend or override built-in or inherited behavior
// - When you need to check property resolution order (own vs inherited)

// Example: Creating an object with a prototype
const proto = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};
const person = Object.create(proto); // person inherits from proto
person.name = 'Alice';
person.greet(); // Hello, my name is Alice (from proto)

// Example: Prototype chain with multiple levels
const grandProto = {
  sayGoodbye() {
    console.log('Goodbye!');
  } 
};
Object.setPrototypeOf(proto, grandProto); // proto inherits from grandProto 
person.sayGoodbye(); // Goodbye! (from grandProto)

// Example: Using constructor functions and prototypes
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const bob = new Person('Bob');
bob.greet(); // Hello, my name is Bob

// Example: ES6 class and prototype chain
class Animal {
  speak() {
    console.log('Animal speaks');
  }
}
class Dog extends Animal {
  speak() {
    console.log('Dog barks');
  }
}
const d = new Dog();
d.speak(); // Dog barks
console.log(Object.getPrototypeOf(d) === Dog.prototype); // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true

// Example: Property lookup order
const chainA = { a: 1 };
const chainB = Object.create(chainA);
chainB.b = 2;
const chainC = Object.create(chainB);
chainC.c = 3;
console.log('\nProperty lookup:');
console.log('chainC.c:', chainC.c); // 3 (own)
console.log('chainC.b:', chainC.b); // 2 (inherited from chainB)
console.log('chainC.a:', chainC.a); // 1 (inherited from chainA)
console.log('c in chainC:', 'c' in chainC); // true
console.log('a in chainC:', 'a' in chainC); // true
console.log('chainC.hasOwnProperty("a"):', chainC.hasOwnProperty('a')); // false

// Best practices:
// - Use prototype chain for shared behavior, not for storing instance data
// - Prefer ES6 classes for clarity, but understand the underlying prototype chain
// - Use Object.create for simple prototype-based inheritance
// - Always check own properties with hasOwnProperty if you want to avoid inherited keys
// - Avoid modifying Object.prototype in production code

// Constructor functions and ES6 classes are the common ways to set up prototype chains,
// enabling inheritance and method sharing among objects.

// A constructor function
function Box(value) {
  this.value = value;
}

// Properties all boxes created from the Box() constructor
// will have
Box.prototype.getValue = function () {
  return this.value;
};

const boxes = [new Box(1), new Box(2), new Box(3)];

// All boxes share the same getValue method via the prototype chain
boxes.forEach(box => {
  console.log('Box value:', box.getValue());
});

// Example 2: Inheritance with constructor functions
function Animal(name) {
  this.name = name;
}

// Dog inherits from Animal 
function Dog(name, breed) { 
    Animal.call(this, name); // call super constructor
    this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log(`${this.name} barks.`);
};
const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // Rex barks.
console.log('dog instanceof Dog:', dog instanceof Dog); // true
console.log('dog instanceof Animal:', dog instanceof Animal); // true  
console.log('dog instanceof Object:', dog instanceof Object); // true

// Example 3: Inheritance with ES6 classes  
class AnimalClass {
  constructor(name) {
    this.name = name;
  } 
    speak() {   
        console.log(`${this.name} makes a sound.`);
    }
}

class DogClass extends AnimalClass {
  constructor(name, breed) {
    super(name); // call super constructor
    this.breed = breed;
  }
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog2 = new DogClass('Buddy', 'Labrador');
dog2.speak();   // Buddy barks.
console.log('dog2 instanceof DogClass:', dog2 instanceof DogClass); // true
console.log('dog2 instanceof AnimalClass:', dog2 instanceof AnimalClass); // true
console.log('dog2 instanceof Object:', dog2 instanceof Object); // true

// Summary:
// - The prototype chain enables inheritance and code reuse in JavaScript
// - Objects can inherit properties/methods from other objects via prototypes
// - Constructor functions and ES6 classes are common ways to set up prototype chains
// - Use prototype chain for shared behavior, not instance data
// - Always check own properties with hasOwnProperty to avoid inherited keys


// Example 6: Memoization with max cache size

function memoizeWithMaxSize(fn, maxSize = 10) {
  const cache = new Map();  
    return function(...args) {  
    const key = JSON.stringify(args);    
    if (cache.has(key)) {      
      console.log(`  [cache hit] ${key}`);
      return cache.get(key);
    }    
    console.log(`  [computing] ${fn.name}(${args.join(', ')})`);
    const result = fn(...args);
    cache.set(key, result);
    // Remove oldest entry if cache exceeds max size
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    return result;
  };
}
function expensiveComputation(x) {
  return x * x * x;
}   
const memoCompute = memoizeWithMaxSize(expensiveComputation, 3);
console.log('\nMemoization with max cache size (3):');
console.log('compute(1):', memoCompute(1)); // computing
console.log('compute(2):', memoCompute(2)); // computing
console.log('compute(3):', memoCompute(3)); // computing
console.log('compute(4):', memoCompute(4)); // computing, evicts oldest (1)
console.log('compute(1):', memoCompute(1)); // computing again (was evicted)    

// Example 7: Class-Based Memoization
class MemoizedFunction {
  constructor(fn) {     
    this.fn = fn;
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }
    call(...args) {
    const key = JSON.stringify(args);
    if (this.cache.has(key)) {
      this.hits++;
        console.log(`  [cache hit] ${key}`);
        return this.cache.get(key);
    }    
    this.misses++;
    console.log(`  [computing] ${this.fn.name}(${args.join(', ')})`);
    const result = this.fn(...args);
    this.cache.set(key, result);
    return result;
  }
}

// Example 8: Using the MemoizedFunction class
const memoizedExpensive = new MemoizedFunction(expensiveComputation);
console.log('\nClass-based Memoization:');
console.log('compute(2):', memoizedExpensive.call(2)); // computing
console.log('compute(2):', memoizedExpensive.call(2)); // cache hit
console.log('compute(3):', memoizedExpensive.call(3)); // computing
console.log('compute(3):', memoizedExpensive.call(3)); // cache hit
console.log('Stats:', memoizedExpensive.stats()); // hits, misses, hitRate, size
console.log('compute(4):', memoizedExpensive.call(4)); // computing
console.log('Stats:', memoizedExpensive.stats()); // updated stats
memoizedExpensive.clear(); // clear cache
console.log('compute(2):', memoizedExpensive.call(2)); // computing after clear


// Different ways of creating and mutating prototype chains

// Object.create to set prototype
proto = { a: 1 };
const o = Object.create(proto);
o.b = 2;    
console.log('for...in:', (() => { let r=[]; for (let k in o) r.push(k); return r; })()); // ['a','b']
console.log('Object.keys:', Object.keys(o)); // ['b']
console.log('hasOwnProperty a?', o.hasOwnProperty('a')); // false   

// Cloning an object with its prototype and property descriptors
const source = { x: 10, y: 20 };
Object.defineProperty(source, 'z', {
  value: 30,
    enumerable: false,
    writable: false,
    configurable: true
});

const descs = Object.getOwnPropertyDescriptors(source);
const clone = Object.create(Object.getPrototypeOf(source), descs);

console.log('clone keys (own enumerable):', Object.keys(clone)); // ['x','y']
console.log('clone all own property names:', Object.getOwnPropertyNames(clone)); // ['x','y','z']
console.log('clone descriptor for z:', Object.getOwnPropertyDescriptor(clone, 'z')); // descriptor for z

// Modifying prototype chain dynamically
const base = { greet() { console.log('Hello from base'); } };
const derived = Object.create(base);
derived.name = 'Derived';
derived.greet(); // Hello from base 
Object.setPrototypeOf(derived, {
  greet() { console.log(`Hello from new prototype, name is ${this.name}`); }    
});
derived.greet(); // Hello from new prototype, name is Derived   

// Summary:
// - Use Object.create to set up prototype chains easily
// - Clone objects with their prototypes and property descriptors using 
//   Object.getOwnPropertyDescriptors and Object.create
// - Modify prototype chains dynamically with Object.setPrototypeOf
// - Understand property lookup order: own properties vs inherited properties

// - Use hasOwnProperty to check for own properties only

// - Prototype chains enable inheritance and code reuse in JavaScript

// - Objects can inherit properties/methods from other objects via prototypes

// - Constructor functions and ES6 classes are common ways to set up prototype chains

// - Use prototype chain for shared behavior, not instance data

// - Always check own properties with hasOwnProperty to avoid inherited keys


// Example 9: Prototype chain with getters/setters
const personProto = {
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};
const personObj = Object.create(personProto);
personObj.firstName = 'John';
personObj.lastName = 'Doe';
console.log('Full Name:', personObj.fullName); // John Doe


// Example 10: Prototype chain with Symbols
const symProto = {
  [Symbol.toStringTag]: 'MyCustomObject'    
};
const symObj = Object.create(symProto);
console.log('symObj toStringTag:', Object.prototype.toString.call(symObj)); // [object MyCustomObject]  


// Example 11: Checking prototype chain with isPrototypeOf
const animalProto = { speak() { console.log('Animal speaks'); } };
const cat = Object.create(animalProto);
cat.name = 'Whiskers';
console.log('animalProto is prototype of cat:', animalProto.isPrototypeOf(cat)); // true
console.log('Object.prototype is prototype of cat:', Object.prototype.isPrototypeOf(cat)); // true


// Example 12: Using super in ES6 classes to access parent methods
class Parent {
  greet() {
    console.log('Hello from Parent');
  }
}

class Child extends Parent {
  greet() {
    super.greet(); // call parent method
    console.log('Hello from Child');
  }
}   
const childInstance = new Child();
childInstance.greet();

// Output:
// Hello from Parent
// Hello from Child

// Example 1: Inheritance with constructor functions
function Animal(name) {
  this.name = name;
}

// Dog inherits from Animal
function Dog(name, breed) {
  Animal.call(this, name); // call super constructor
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log(`${this.name} barks.`);
};

dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // Rex barks.
console.log('dog instanceof Dog:', dog instanceof Dog); // true
console.log('dog instanceof Animal:', dog instanceof Animal); // true
console.log('dog instanceof Object:', dog instanceof Object); // true   


// Example 2: Inheritance with ES6 classes
class AnimalClass {
  constructor(name) {
    this.name = name;
  }     
  speak() {   
    console.log(`${this.name} makes a sound.`);
  }  
}

class DogClass extends AnimalClass {
  constructor(name, breed) {
    super(name); // call super constructor
    this.breed = breed;
  }
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dogClass = new DogClass('Rex', 'German Shepherd');
dogClass.speak(); // Rex barks.
console.log('dogClass instanceof DogClass:', dogClass instanceof DogClass); // true
console.log('dogClass instanceof AnimalClass:', dogClass instanceof AnimalClass); // true
console.log('dogClass instanceof Object:', dogClass instanceof Object); // true


// Prototype chain demonstration
console.log('\nPrototype chain:');
console.log(Object.getPrototypeOf(dogClass) === DogClass.prototype); // true
console.log(Object.getPrototypeOf(DogClass.prototype) === AnimalClass.prototype); // true
console.log(Object.getPrototypeOf(AnimalClass.prototype) === Object.prototype); // true

// You can also use Object.setPrototypeOf and Object.create for custom chains
const parent = { greet() { console.log('Hello from parent!'); } };
const child = Object.create(parent);
child.sayHi = function() { console.log('Hi from child!'); };
child.greet(); // Hello from parent!
child.sayHi(); // Hi from child!

// Summary:
// - Inheritance enables code reuse and logical hierarchies
// - JavaScript uses prototype chains for inheritance
// - ES6 class syntax is syntactic sugar over prototypes
// - Use inheritance for shared behavior, but prefer composition for flexibility