// Using Classes:

const bigDay = new Date(2025, 6, 19);
console.log(bigDay.toDateString());

if(bigDay.getTime() < Date.now()) {
    console.log("Once upon a time ... ")
}

// Declaring a class

class MyClass {
  // Constructor
  constructor() {
    // Constructor body
  }
  // Instance field
  myField = "foo";
  // Instance method
  myMethod() {
    // myMethod body
  }
  // Static field
  static myStaticField = "bar";
  // Static method
  static myStaticMethod() {
    // myStaticMethod body
  }
  // Static block
  static {
    // Static initialization code
  }
  // Fields, methods, static fields, and static methods all have
  // "private" forms
  #myPrivateField = "bar";
}

//  following with function constructors:
function MyClass() {
  this.myField = "foo";
  // Constructor body
}
MyClass.myStaticField = "bar";
MyClass.myStaticMethod = function () {
  // myStaticMethod body
};
MyClass.prototype.myMethod = function () {
  // myMethod body
};

(function () {
  // Static initialization code
})();



// Constructing a class

const myInstance = new MyClass();
console.log(myInstance.myField); // 'foo'
myInstance.myMethod();

//Class declaration hoisting

new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization

class MyClass {}


// Class expressions

const MyClass = class {
  // Class body...
};

const MyClass = class MyClassLongerName {
  // Class body. Here MyClass and MyClassLongerName point to the same class.
};
new MyClassLongerName(); // ReferenceError: MyClassLongerName is not defined