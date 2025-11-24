// Objects:  An object is a collection of properties, and a property is an association between a name (or key) and a value. A property's value can be a function, in which case the property is known as a method.

// Creating a new Objects - We can use Object Initializer
// Alternatively, you can first create a constructor function and then instantiate an object by invoking that function with the new operator.

// Using object initializers https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer

const object1 = { a: "joo", b: 42, c: {} };

console.log(object1.a);
// Expected output: "joo"

const a = "joo";
const b = 40;
const c = {};
const object2 = { a: a, b: b, c: c };

console.log(object2.b);
// Expected output: 40

const object3 = { a, b, c };

console.log(object3.a);
// Expected output: "joo"


const object = {
  coo: "bar",
  age: 40,
  baz: { myProp: 10 },
};

//Accessing properties
object.coo; // "bar"
object["age"]; // 40
object.baz; // {myProp: 10}
object.baz.myProp; // 10

const obj = {
    name: "Indra",
    age: 40,
    address: "Hyderabad"
}


// Method definitions: A property of an object can also refer to a function or a getter or setter method.

const o = {
  property: function (parameters) {},
  get property() {
    return 1;
  },
  set property(value) {},
};

// A shorthand notation is available, so that the keyword function is no longer necessary.
// Shorthand method names
const o1 = {
  property(parameters) {

  },
};

//There is also a way to concisely define generator methods.

const o2 = {
  *generator() {
    // …
  },
};


// Computed property names

// The object initializer syntax also supports computed property names. That allows you to put an expression in square brackets [], that will be computed and used as the property name. 
let i = 0;
const a1 = {
  [`foo${++i}`]: i,
  [`foo${++i}`]: i,
  [`foo${++i}`]: i,
};

console.log(a1.foo1); // 1
console.log(a1.foo2); // 2
console.log(a1.foo3); // 3

const items = ["A", "B", "C"];
const obj1 = {
  [items]: "Hello",
};
console.log(obj1); // A,B,C: "Hello"
console.log(obj1["A,B,C"]); // "Hello"

const param = "size";
const config = {
  [param]: 12,
  [`mobile${param.charAt(0).toUpperCase()}${param.slice(1)}`]: 4,
};

console.log(config); // {size: 12, mobileSize: 4}


// Spread properties

// Object literals support the spread syntax. It copies own enumerable properties from a provided object onto a new object. 
// Shallow-cloning (excluding prototype) or merging objects is now possible using a shorter syntax than Object.assign().

const obj3 = { foo: "bar", x: 42 };
const obj2 = { foo: "baz", y: 13 };

const clonedObj = { ...obj3 };
// { foo: "bar", x: 42 }

const mergedObj = { ...obj3, ...obj2 };
// { foo: "baz", x: 42, y: 13 }


// Using a constructor function

/**
 *  Alternatively, you can create an object with these two steps:
    Define the object type by writing a constructor function. There is a strong convention, with good reason, to use a capital initial letter.
    Create an instance of the object with new.
 */

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const myCar = new Car("Tiagun", "Facelift TSI", 2025);

const hyndaiCar = new Car("Creta", "2100CC", 2025);
const renaultCar = new Car("Duster", "Facelift", 2026);


function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

const p1 = new Person("Indra Gupta", 40, "M");
const p2 = new Person("Ankita", 39, "F");

function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}

const car1 = new Car("Creta", "2100CC", 2025, p1);
const car2 = new Car("Duster", "Facelift", 2026, p2);


// Using the Object.create() method

// Objects can also be created using the Object.create() method. 
// This method can be very useful, because it allows you to choose the prototype object for the object you want to create, 
// without having to define a constructor function. 

// Animal properties and method encapsulation
const Animal = {
  type: "Invertebrates", // Default value of properties
  displayType() {
    // Method which will display type of Animal
    console.log(this.type);
  },
};

// Create new animal type called `animal`
const animal = Object.create(Animal);
animal.displayType(); // Logs: Invertebrates

// Create new animal type called fish
const fish = Object.create(Animal);
fish.type = "Fishes";
fish.displayType(); // Logs: Fishes


//Enumerating properties

/**
 * There are three native ways to list/traverse object properties:
    for...in loops. This method traverses all of the enumerable string properties of an object as well as its prototype chain.
    Object.keys(). This method returns an array with only the enumerable own string property names ("keys") in the object myObj, but not those in the prototype chain.
    Object.getOwnPropertyNames(). This method returns an array containing all the own string property names in the object myObj, regardless of if they are enumerable or not.
 */

function showProps(obj, objName) {
  let result = "";
  for (const i in obj) {
    // Object.hasOwn() is used to exclude properties from the object's
    // prototype chain and only show "own properties"
    if (Object.hasOwn(obj, i)) {
      result += `${objName}.${i} = ${obj[i]}\n`;
    }
  }
  console.log(result);
}

// The above is equivalent to:

function showProps(obj, objName) {
  let result = "";
  Object.keys(obj).forEach((i) => {
    result += `${objName}.${i} = ${obj[i]}\n`;
  });
  console.log(result);
}


/**
 * There is no native way to list all inherited properties including non-enumerable ones. However, this can be achieved with the following function:
 */
function listAllProperties(myObj) {
  let objectToInspect = myObj;
  let result = [];

  while (objectToInspect !== null) {
    result = result.concat(Object.getOwnPropertyNames(objectToInspect));
    objectToInspect = Object.getPrototypeOf(objectToInspect);
  }

  return result;
}

// Deleting properties:

// Creates a new object, myObj, with two properties, a and b.
const myObj = { a: 5, b: 12 };

// Removes the a property, leaving myObj with only the b property.
delete myObj.a;
console.log("a" in myObj); // false