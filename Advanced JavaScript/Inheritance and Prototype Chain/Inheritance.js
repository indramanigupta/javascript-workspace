// Inheritance and Prototype Chain in JavaScript
// ---------------------------------------------
// Inheritance allows one object or class to access properties and methods of another.
// JavaScript uses prototype-based inheritance, meaning objects inherit directly from other objects.
// ES6 introduced class syntax, but under the hood, it still uses prototypes.

// Why use inheritance?
// - Code reuse: Share common logic between related objects
// - Organization: Structure code into hierarchies (e.g., Animal -> Dog)
// - Extensibility: Add new features to existing code

// Example 1: Prototype-based inheritance (ES5 style)

function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(this.name + ' makes a sound.');
};

function Dog(name) {
  Animal.call(this, name); // call parent constructor
}
Dog.prototype = Object.create(Animal.prototype); // inherit methods
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function() {
  console.log(this.name + ' barks.');
};

var dog = new Dog('Rex');
dog.speak(); // Rex barks.

// Example 2: ES6 class inheritance

class AnimalClass {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class DogClass extends AnimalClass {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog2 = new DogClass('Buddy');
dog2.speak(); // Buddy barks.

// Prototype chain demonstration
console.log('\nPrototype chain:');
console.log(Object.getPrototypeOf(dog2) === DogClass.prototype); // true
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


// Best practices:  
// - Prefer composition over inheritance for flexibility
// - Use ES6 classes for clearer syntax and better readability
// - Avoid deep inheritance chains to reduce complexity
// - Use Object.create for simple prototype-based inheritance
// - Always set the constructor property when manually setting prototypes

// When to use inheritance
// - When you have a clear "is-a" relationship (e.g., Dog is an Animal)
// - When you want to share behavior across related objects
// - When extending built-in types (e.g., custom Error classes)

// Where to use inheritance
// - In frameworks/libraries to create base classes (e.g., React.Component)
// - In domain models to represent hierarchies (e.g., Shape -> Circle, Square)
// - In UI components to share common functionality (e.g., Button -> IconButton)

/*
Prototype-based inheritance (ES5): Shows how to set up inheritance using constructor functions and prototypes.
Class-based inheritance (ES6): Uses class and extends for cleaner syntax.
Prototype chain demo: Verifies the chain and shows custom inheritance with Object.create.

**/