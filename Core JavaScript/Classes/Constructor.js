// Constructor
// Constructor - In classes, the instance creation is done by the constructor.


class Color {
  constructor(r, g, b) {
    // Assign the RGB values as a property of `this`.
    this.values = [r, g, b];
  }
}

const red = new Color(255, 0, 0);
console.log(red);


function createColor(r, g, b) {
  return {
    values: [r, g, b],
  };
}

class Color {
  constructor(...values) {
    this.values = values;
  }
}

red = new Color(255, 0, 0);
// Creates an instance with the same shape as above.

//Each time you call new, a different instance is created.

red = new Color(255, 0, 0);
const anotherRed = new Color(255, 0, 0);
console.log(red === anotherRed); // false



class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

// Instance creation is done by the constructor via `new`
const rect = new Rectangle(10, 5);
console.log(`Area: ${rect.area()}`); // Area: 50



// Instance method: 


class Color {
  constructor(r, g, b) {
    this.values = [r, g, b];
  }
  getRed() {
    return this.values[0];
  }
}

red = new Color(255, 0, 0);
console.log(red.getRed()); // 255



class Color {
  constructor(r, g, b) {
    this.values = [r, g, b];
  }
  getRed() {
    return this.values[0];
  }
  setRed(value) {
    this.values[0] = value;
  }
}

red = new Color(255, 0, 0);
red.setRed(0);
console.log(red.getRed()); // 0; of course, it should be called "black" at this stage!


// Private fields

/**
 * A private field is an identifier prefixed with # (the hash symbol). 
 * The hash is an integral part of the field's name, which means a private field can never have name clash with a public field or method. 
 * In order to refer to a private field anywhere in the class, you must declare it in the class body (you can't create a private element on the fly). 
 * Apart from this, a private field is pretty much equivalent to a normal property.
 */

class Color {
  // Declare: every Color instance has a private field called #values.
  #values;
  constructor(r, g, b) {
    this.#values = [r, g, b];
  }
  getRed() {
    return this.#values[0];
  }
  setRed(value) {
    this.#values[0] = value;
  }
}


red = new Color(255, 0, 0);
console.log(red.getRed()); // 255

/**
 * console.log(red.#values); 
 * // SyntaxError: Private field '#values' must be declared in an enclosing class
 */


class Color {
  #values;
  constructor(r, g, b) {
    this.#values = [r, g, b];
  }
  getRed() {
    return this.#values[0];
  }
  setRed(value) {
    if (value < 0 || value > 255) {
      throw new RangeError("Invalid R value");
    }
    this.#values[0] = value;
  }
}

red = new Color(255, 0, 0);
red.setRed(1000); // RangeError: Invalid R value


class Color {
  #values;
  constructor(r, g, b) {
    this.#values = [r, g, b];
  }
  redDifference(anotherColor) {
    // #values doesn't necessarily need to be accessed from this:
    // you can access private fields of other instances belonging
    // to the same class.
    return this.#values[0] - anotherColor.#values[0];
  }
}

red = new Color(255, 0, 0);
const crimson = new Color(220, 20, 60);
red.redDifference(crimson); // 35

// If you don't know if a private field exists on an object 
// and you wish to access it without using try/catch to handle the error, 
// you can use the in operator.

class Color {
  #values;
  constructor(r, g, b) {
    this.#values = [r, g, b];
  }
  redDifference(anotherColor) {
    if (!(#values in anotherColor)) {
      throw new TypeError("Color instance expected");
    }
    return this.#values[0] - anotherColor.#values[0];
  }
}

//Methods, getters, and setters can be private as well.



class Counter extends HTMLElement {
  #xValue = 0;
  constructor() {
    super();
    this.onclick = this.#clicked.bind(this);
  }
  get #x() {
    return this.#xValue;
  }
  set #x(value) {
    this.#xValue = value;
    window.requestAnimationFrame(this.#render.bind(this));
  }
  #clicked() {
    this.#x++;
  }
  #render() {
    this.textContent = this.#x.toString();
  }
  connectedCallback() {
    this.#render();
  }
}

customElements.define("num-counter", Counter);