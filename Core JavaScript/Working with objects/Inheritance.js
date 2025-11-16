// Inheritance: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain

Car.prototype.color = "blue";

console.log(car1.color); // Output: blue

// Methods are typically defined on the prototype object of the constructor, so that all objects of the same type share the same method

Car.prototype.displayCar = function () {
  const result = `A Beautiful ${this.year} ${this.make} ${this.model}`;
  console.log(result);
};

//Using this for object references: JavaScript has a special keyword, this, that you can use within a method to refer to the current object.

const Manager = {
  name: "Karina",
  age: 27,
  job: "Software Engineer",
};
const Intern = {
  name: "Tyrone",
  age: 21,
  job: "Software Engineer Intern",
};

function sayHi() {
  console.log(`Hello, my name is ${this.name}`);
}

// add sayHi function to both objects
Manager.sayHi = sayHi;
Intern.sayHi = sayHi;

Manager.sayHi(); // Hello, my name is Karina
Intern.sayHi(); // Hello, my name is Tyrone



// Defining getters and setters:

//  A getter is a function associated with a property that gets the value of a specific property. 
//  A setter is a function associated with a property that sets the value of a specific property. 
//  Together, they can indirectly represent the value of a property.


const myObj = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2;
  },
};

console.log(myObj.a); // 7
console.log(myObj.b); // 8, returned from the get b() method
myObj.c = 50; // Calls the set c(x) method
console.log(myObj.a); // 25





/**
 * Getters and setters can also be added to an object at any time after creation using the Object.defineProperties() method. 
 * This method's first parameter is the object on which you want to define the getter or setter. 
 * The second parameter is an object whose property names are the getter or setter names, and whose property values are objects for defining the getter or setter functions.
 */

const myObj = { a: 0 };

Object.defineProperties(myObj, {
  b: {
    get() {
      return this.a + 1;
    },
  },
  c: {
    set(x) {
      this.a = x / 2;
    },
  },
});

myObj.c = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(myObj.b); // Runs the getter, which yields a + 1 or 6



// Comparing objects: objects are a reference type. Two distinct objects are never equal, even if they have the same properties. Only comparing the same object reference with itself yields true.

// Two variables, two distinct objects with the same properties
const fruit = { name: "apple" };
const anotherFruit = { name: "apple" };

fruit == anotherFruit; // return false
fruit === anotherFruit; // return false

// Two variables, a single object
const fruit1 = { name: "apple" };
const anotherFruit1 = fruit1; // Assign fruit1 object reference to anotherFruit1

// Here fruit1 and anotherFruit1 are pointing to same object
fruit1 == anotherFruit1; // return true
fruit1 === anotherFruit1; // return true

fruit1.name = "grape";
console.log(anotherFruit1); // { name: "grape" }; not { name: "apple" }