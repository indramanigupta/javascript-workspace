// Extends and Inheritance

class Color {
    #values;

    constructor(r, g, b, a = 1) {
        this.#values = [r, g, b, a];
    }

    get alpha() {
        return this.#values[3];
    }

    set alpha(value) {
        if (value < 0 || value > 1) {
            throw new RangeError("Aphha value must be between 0 and 1");
        }
        this.#values[3] = value;
    }

    //Instead, our class can override it to print the color's RGB values:
    toString() {
        return this.#values.join(", ");
    }
}

class ColorWithAlpha extends Color {
    #alpha;
    constructor(r, g, b, a = 1) {
        super(r, g, b); // this — here it's roughly equivalent to this = new Color(r, g, b).
        this.#alpha = a;
    }

    get alpha() {
        return this.#alpha;
    }

    set alpha(value) {
        if (value < 0 || value > 1) {
            throw new RangeError("Aphha value must be between 0 and 1");
        }
        this.#alpha = value;
    }

    toString() {
        // Call the parent class's toString() and build on the return value
        return `${super.toString()}, ${this.#alpha}`;
    }

    static isValid(r, g, b, a) {
        // Call the parent class's isValid() and build on the return value
        return super.isValid(r, g, b) && a >= 0 && a <= 1;
    }
}

const color = new ColorWithAlpha(255, 0, 0, 0.5);
console.log(color.red); // 255

console.log(red.toString()); // [object Object]


console.log(new Color(255, 0, 0).toString()); // '255, 0, 0'

console.log(new ColorWithAlpha(255, 0, 0, 0.5).toString()); // '255, 0, 0, 0.5'


/**
 * Derived classes don't have access to the parent class's private fields 
 * — this is another key aspect to JavaScript private fields being "hard private". 
 * Private fields are scoped to the class body itself and do not grant access to any outside code.
 */

/**
 * A class can only extend from one class. 
 * This prevents problems in multiple inheritance like the diamond problem.
 * 
 * However, due to the dynamic nature of JavaScript, 
 * it's still possible to achieve the effect of multiple inheritance 
 * through class composition and mixins.
 */

// Instances of derived classes are also instances of the base class.

color = new ColorWithAlpha(255, 0, 0, 0.5);
console.log(color instanceof Color); // true
console.log(color instanceof ColorWithAlpha); // true

