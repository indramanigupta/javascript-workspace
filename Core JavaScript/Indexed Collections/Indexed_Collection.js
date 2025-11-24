// Indexed Collections:
// An array is an ordered list of values that you refer to with a name and an index.


// Explanation:
// An "indexed collection" is any data structure that stores elements which
// can be accessed by an index (usually a numeric position). In JavaScript
// the primary indexed collection is Array, but there are also TypedArrays,
// sparse arrays, array-like objects, and custom indexed collections.
// This file contains basic → advanced examples and a small, reusable
// `IndexedCollection` class with bounds-checked access, binary search,
// iterator support and an optional Proxy wrapper to support Python-style
// negative indices.

// Creating an array

const arr1 = new Array(e1, e2, e3);
const arr2 = Array(e1, e2, e3);
const arr3 = [e1, e2, e3];

//This creates an array with only one element: the number 10.
const array = [10];

// This creates an array with no elements and arr.length set to 10.
const arr = Array(10);

//OR

const arr4 = [];
arr4.length = 10;


// We can also use the Array.of static method to create arrays with single element.

const array1 = Array.of(10.5);
// array1 contains only one element 10.5

// length property:The length property is special. Its value is always a positive integer greater than the index of the last element if one exists.

const cats = ["Dusty", "Misty", "Twiggy"];
console.log(cats.length); // 3

cats.length = 2;
console.log(cats); // [ 'Dusty', 'Misty' ] - Twiggy has been removed

cats.length = 0;
console.log(cats); // []; the cats array is empty

cats.length = 3;
console.log(cats); // [ <3 empty items> ]



// Iterating over Arrays:

const colors = ["blacj", "white", "yellow"];
for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}

// ------------------------- Point Start-------------------------

/* If you know that none of the elements in your array evaluate to false in a boolean context—if your array consists only of DOM nodes, 
for example—you can use a more efficient idiom: 
*/

const divs = document.getElementsByTagName("div");
for (let i = 0, div; (div = divs[i]); i++) {
  /* Process div in some way */
}

/**
 * This avoids the overhead of checking the length of the array, 
 * and ensures that the div variable is reassigned to the current item each time around the loop for added convenience.
 */


//The forEach() method provides another way of iterating over an array:

colors.forEach((color) => console.log(color));

const sparseArray = ["first", "second", , "fourth"];

sparseArray.forEach((element) => {
  console.log(element);
});
// Logs:
// first
// second
// fourth

if (sparseArray[2] === undefined) {
  console.log("sparseArray[2] is undefined"); // true
}

const nonsparseArray = ["first", "second", undefined, "fourth"];

nonsparseArray.forEach((element) => {
  console.log(element);
});

// Output:
// first
// second
// undefined
// fourth

if (sparseArray[2] === undefined) {
  console.log("sparseArray[2] is undefined"); // true
}

nonsparseArray.forEach((element) => {
  console.log(element);
});

// Output:
// first
// second
// undefined
// fourth


// Array method:

// concat() : The concat() method joins two or more arrays and returns a new array.
let myArray = ["1", "2", "3"];
myArray = myArray.concat("a", "b", "c");
// myArray is now ["1", "2", "3", "a", "b", "c"]

// join(): The join() method joins all elements of an array into a string.
const myArray1 = ["Wind", "Rain", "Fire"];
const list = myArray1.join(" - "); // list is "Wind - Rain - Fire"

// push(): method adds one or more elements to the end of an array and returns the resulting length of the array.

myArray.push("4"); // myArray is now ["1", "2", "3", "4"]

//pop():  The pop() method removes the last element from an array and returns that element.
const last = myArray.pop();
// myArray is now ["1", "2", "3"], last = "4"

//shift(): The shift() method removes the first element from an array and returns that element.
const first = myArray.shift();
// myArray is now ["2", "3"], first is "1"

//unshift(): The unshift() method adds one or more elements to the front of an array and returns the new length of the array.

myArray.unshift("4", "5");
// myArray becomes ["4", "5", "1", "2", "3"]

//slice(): The slice() method extracts a section of an array and returns a new array.
let myArray2 = ["a", "b", "c", "d", "e"];
myArray = myArray2.slice(1, 4); // [ "b", "c", "d"]
// starts at index 1 and extracts all elements
// until index 3


//at(): The at() method returns the element at the specified index in the array, or undefined if the index is out of range. 
// It's notably used for negative indices that access elements from the end of the array.

myArray2.at(-2); // "d", the second-last element of myArray

//splice(): The splice() method removes elements from an array and (optionally) replaces them. It returns the items which were removed from the array.

const myArray4 = ["1", "2", "3", "4", "5"];
myArray4.splice(1, 3, "a", "b", "c", "d");
// myArray is now ["1", "a", "b", "c", "d", "5"]
// This code started at index one (or where the "2" was),
// removed 3 elements there, and then inserted all consecutive
// elements in its place.

//reverse(): The reverse() method transposes the elements of an array, 
// in place: the first array element becomes the last and the last becomes the first. 
// It returns a reference to the array.
const myArray5 = ["1", "2", "3"];
myArray5.reverse();
// transposes the array so that myArray = ["3", "2", "1"]

//flat(): The flat() method returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.

let myArray6 = [1, 2, [3, 4]];
myArray6 = myArray6.flat();
// myArray is now [1, 2, 3, 4], since the [3, 4] subarray is flattened

//sort(): The sort() method sorts the elements of an array in place, and returns a reference to the array.
const myArray7 = ["Wind", "Rain", "Fire"];
myArray7.sort();
// sorts the array so that myArray = ["Fire", "Rain", "Wind"]

//indexOf() : The indexOf() method searches the array for searchElement and returns the index of the first match.
//lastIndexOf(): The lastIndexOf() method works like indexOf, but starts at the end and searches backwards.
//The forEach() method executes callback on every array item and returns undefined.
// The map() method returns a new array of the return value from executing callback on every array item.
const a1 = ["a", "b", "c"];
const a2 = a1.map((item) => item.toUpperCase());
console.log(a2); // ['A', 'B', 'C']

//flatMap() : The flatMap() method runs map() followed by a flat() of depth 1.
const a3 = ["a", "b", "c"];
const a4 = a3.flatMap((item) => [item.toUpperCase(), item.toLowerCase()]);
console.log(a4); // ['A', 'a', 'B', 'b', 'C', 'c']

//filter() : The filter() method returns a new array containing the items for which callback returned true.
const a5 = ["a", 10, "b", 20, "c", 30];
const a6 = a1.filter((item) => typeof item === "number");
console.log(a2); // [10, 20, 30]

//The find() method returns the first item for which callback returned true.
//The findLast() method returns the last item for which callback returned true.
//const a1 = ["a", 10, "b", 20, "c", 30];

//The findIndex() method returns the index of the first item for which callback returned true.
const a7 = ["a", 10, "b", 20, "c", 30];
const i = a7.findIndex((item) => typeof item === "number");
console.log(i); // 1

//The findLastIndex() method returns the index of the last item for which callback returned true.


//The every() method returns true if callback returns true for every item in the array.

function isNumber(value) {
  return typeof value === "number";
}
const a8 = [1, 2, 3];
console.log(a8.every(isNumber)); // true
const a9 = [1, "2", 3];
console.log(a9.every(isNumber)); // false

//The some() method returns true if callback returns true for at least one item in the array.
function isNumber(value) {
  return typeof value === "number";
}
const ax = [1, 2, 3];
console.log(ax.some(isNumber)); // true
const ay = [1, "2", 3];
console.log(ay.some(isNumber)); // trues
const az = ["1", "2", "3"];
console.log(az.some(isNumber)); // false


//The reduce() method applies callback(accumulator, currentValue, currentIndex, array) 
// for each value in the array for the purpose of reducing the list of items down to a single value. 
// The reduce function returns the final value returned by callback function.

const a = [10, 20, 30];
const total = a.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
console.log(total); // 60

//The reduceRight() method works like reduce(), but starts with the last element.


// ------------------------- Point End-------------------------

// Array transformations

// Grouping the elements of an array

/**
 * The Object.groupBy() method can be used to group the elements of an array, 
 * using a test function that returns a string indicating the group of the current element.
 */

const inventory = [
  { name: "asparagus", type: "vegetables" },
  { name: "bananas", type: "fruit" },
  { name: "goat", type: "meat" },
  { name: "cherries", type: "fruit" },
  { name: "fish", type: "meat" },
];

const result = Object.groupBy(inventory, ({type}) => type);
console.log(result);

// Output:
// {
//   vegetables: [{ name: 'asparagus', type: 'vegetables' }],
//   fruit: [
//     { name: 'bananas', type: 'fruit' },
//     { name: 'cherries', type: 'fruit' }
//   ],
//   meat: [
//     { name: 'goat', type: 'meat' },
//     { name: 'fish', type: 'meat' }
//   ]
// }



//Sparse arrays:

//Arrays can contain "empty slots", which are not the same as slots filled with the value undefined. 
// Empty slots can be created in one of the following ways:

// Array constructor:
const a_1 = Array(5); // [ <5 empty items> ]

// Consecutive commas in array literal:
const b = [1, 2, , , 5]; // [ 1, 2, <2 empty items>, 5 ]

// Directly setting a slot with index greater than array.length:
const c = [1, 2];
c[4] = 5; // [ 1, 2, <2 empty items>, 5 ]

// Elongating an array by directly setting .length:
const d = [1, 2];
d.length = 5; // [ 1, 2, <3 empty items> ]

// Deleting an element:
const e = [1, 2, 3, 4, 5];
delete e[2]; // [ 1, 2, <1 empty item>, 4, 5 ]



const arrX = [1, 2, , , 5]; // Create a sparse array

// Indexed access
console.log(arrX[2]); // undefined

// For...of
for (const i of arrX) {
  console.log(i);
}
// Output: 1 2 undefined undefined 5

// Spreading
const another = [...arrX]; // "another" is [ 1, 2, undefined, undefined, 5 ]


//But in others (most notably array iteration methods), empty slots are skipped.

const mapped = arr.map((i) => i + 1); // [ 2, 3, <2 empty items>, 6 ]
arr.forEach((i) => console.log(i)); // 1 2 5
const filtered = arr.filter(() => true); // [ 1, 2, 5 ]
const hasFalsy = arr.some((k) => !k); // false

// Property enumeration
const keys = Object.keys(arr); // [ '0', '1', '4' ]
for (const key in arr) {
  console.log(key);
}
// Logs: '0' '1' '4'

// Spreading into an object uses property enumeration, not the array's iterator
const objectSpread = { ...arr }; // { '0': 1, '1': 2, '4': 5 }

// Multi-dimensional arrays:

const am = new Array(4);
for (let i = 0; i < 4; i++) {
  am[i] = new Array(4);
  for (let j = 0; j < 4; j++) {
    am[i][j] = `[${i}, ${j}]`;
  }
}

//Using arrays to store other properties

const arr_X = [1, 2, 3];
arr_X.property = "value";
console.log(arr_X.property); // "value"


// ------------------------- Basic examples -------------------------

// 1) Standard arrays
const basicArray = [10, 20, 30];
console.log('basicArray[0] =', basicArray[0]); // 10
console.log('basicArray.length =', basicArray.length); // 3

// 2) Typed arrays (contiguous numeric storage)
const typed = new Int32Array([5, 6, 7]);
console.log('typed[2] =', typed[2]); // 7

// 3) Sparse arrays
const sparse = [];
sparse[50] = 'end';
console.log('sparse.length =', sparse.length); // 51 (hole-filled length)
console.log('0 in sparse =', 0 in sparse); // false (hole)

// --------------------- IndexedCollection class ---------------------

class IndexedCollection {
	constructor(iterable = []) {
		this._data = Array.from(iterable);
	}

	get length() {
		return this._data.length;
	}

	// Bounds-checked get
	get(index) {
		if (!Number.isInteger(index)) throw new TypeError('Index must be an integer');
		if (index < 0 || index >= this._data.length) throw new RangeError('Index out of range');
		return this._data[index];
	}

	// Bounds-checked set
	set(index, value) {
		if (!Number.isInteger(index)) throw new TypeError('Index must be an integer');
		if (index < 0 || index >= this._data.length) throw new RangeError('Index out of range');
		this._data[index] = value;
	}

	push(value) {
		this._data.push(value);
		return this.length;
	}

	// Simple binary search on sorted ascending collection
	// Returns index of found element or -1 if not found.
	binarySearch(target, compare = (a, b) => a - b) {
		let lo = 0;
		let hi = this._data.length - 1;
		while (lo <= hi) {
			const mid = (lo + hi) >> 1;
			const cmp = compare(this._data[mid], target);
			if (cmp === 0) return mid;
			if (cmp < 0) lo = mid + 1;
			else hi = mid - 1;
		}
		return -1;
	}

	// Convert to native array (shallow copy)
	toArray() {
		return this._data.slice();
	}

	// Default iterator (makes for..of work)
	[Symbol.iterator]() {
		return this._data[Symbol.iterator]();
	}

	// Static factory
	static from(iterable) {
		return new IndexedCollection(iterable);
	}
}

// ---------------- Proxy wrapper: negative index support ----------------

// This small wrapper returns a Proxy that maps negative numeric indices
// to positions from the end (like Python's -1 for last element).
function withNegativeIndices(indexedCollection) {
	return new Proxy(indexedCollection, {
		get(target, prop, receiver) {
			if (typeof prop === 'string' && /^[+-]?\d+$/.test(prop)) {
				const idx = Number(prop);
				const real = idx < 0 ? target.length + idx : idx;
				return target.get(real);
			}
			return Reflect.get(target, prop, receiver);
		},
		set(target, prop, value, receiver) {
			if (typeof prop === 'string' && /^[+-]?\d+$/.test(prop)) {
				const idx = Number(prop);
				const real = idx < 0 ? target.length + idx : idx;
				target.set(real, value);
				return true;
			}
			return Reflect.set(target, prop, value, receiver);
		}
	});
}

// -------------------- Advanced examples & tests --------------------

// Example: create an indexed collection and run binary search
const ic = IndexedCollection.from([1, 3, 5, 7, 9]);
console.log('ic.length =', ic.length); // 5
console.log('ic.get(2) =', ic.get(2)); // 5
console.log('binarySearch 7 =>', ic.binarySearch(7)); // 3
console.log('binarySearch 4 =>', ic.binarySearch(4)); // -1

// Proxy to allow negative indices
const proxiedIc = withNegativeIndices(ic);
console.log("proxiedIc['-1'] =", proxiedIc['-1']); // 9
proxiedIc['-1'] = 11; // set last element
console.log('ic.get(ic.length - 1) after set =', ic.get(ic.length - 1)); // 11

// Backreferences example (repeated words) using RegExp on native arrays to show interoperability
const sentence = 'the the quick brown fox fox jumped';
const repeated = sentence.match(/\b(\w+)\s+\1\b/gi);
console.log('repeated words found:', repeated); // e.g. ['the the', 'fox fox']

// TypedArray usage note: fixed-length and numeric-only
const floats = new Float64Array(4);
floats[0] = 1.5;
floats[3] = 4.5;
console.log('Float64Array contents:', Array.from(floats));

// Sparse array performance note (example)
const sparseExample = [];
sparseExample[1000] = 'x';
console.log('sparseExample length', sparseExample.length);

// Simple demonstration of iteration and common patterns
console.log('Iterating IndexedCollection:');
for (const v of ic) {
	console.log('  value =', v);
}

// -------------------- End of examples --------------------

// Export for other modules (if used in Node or bundlers)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { IndexedCollection, withNegativeIndices };
}

