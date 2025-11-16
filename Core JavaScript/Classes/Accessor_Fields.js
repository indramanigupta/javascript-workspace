// Accessor fields

class Circle {
    // private field
    #radius;

    constructor(radius = 1) {
        this.radius = radius; // go through setter validation
    }

    // getter for radius
    get radius() {
        return this.#radius;
    }

    // setter for radius with validation
    set radius(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new TypeError('radius must be a positive number');
        }
        this.#radius = value;
    }

    // computed read-only property
    get area() {
        return Math.PI * this.#radius * this.#radius;
    }

    // diameter as an accessor that can be read and set
    get diameter() {
        return this.#radius * 2;
    }

    set diameter(value) {
        this.radius = value / 2; // reuse validation in radius setter
    }

    toString() {
        return `Circle(radius=${this.#radius.toFixed(2)}, area=${this.area.toFixed(2)})`;
    }
}

// Usage
const c = new Circle(2.5);
console.log(c.radius);     // 2.5
console.log(c.diameter);   // 5
console.log(c.area);       // ~19.6349540849

c.diameter = 10;
console.log(c.radius);     // 5
console.log(String(c));    // Circle(radius=5.00, area=78.54)

// invalid assignment throws
try {
    c.radius = -3;
} catch (e) {
    console.error(e.message); // radius must be a positive number
}




//

class Color {
  constructor(r, g, b) {
    this.values = [r, g, b];
  }
  get red() {
    return this.values[0];
  }
  set red(value) {
    this.values[0] = value;
  }
}

const red = new Color(255, 0, 0);
red.red = 0;
console.log(red.red); // 0


//If a field only has a getter but no setter, it will be effectively read-only.

class Color {
  constructor(r, g, b) {
    this.values = [r, g, b];
  }
  get red() {
    return this.values[0];
  }
}

const red = new Color(255, 0, 0);
red.red = 0;
console.log(red.red); // 255



// Public fields: 

class MyClass {
  luckyNumber = Math.random();
}
console.log(new MyClass().luckyNumber); // 0.5
console.log(new MyClass().luckyNumber); // 0.3

// Public fields are almost equivalent to assigning a property to this.

class MyClass {
  constructor() {
    this.luckyNumber = Math.random();
  }
}


// Static properties:

/**
 * Static properties are a group of class features that are defined on the class itself, rather than on individual instances of the class. These features include:

    Static methods
    Static fields
    Static getters and setters
 * 
 */


class Color {
  static isValid(r, g, b) {
    return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
  }
}

Color.isValid(255, 0, 0); // true
Color.isValid(1000, 0, 0); // false

console.log(new Color(0, 0, 0).isValid); // undefined


class MyClass {
  static {
    MyClass.myStaticProperty = "foo";
  }
}

console.log(MyClass.myStaticProperty); // 'foo'

/**
 * Static initialization blocks are almost equivalent to immediately executing 
 * some code after a class has been declared.
 * The only difference is that they have access to static private elements.
 */