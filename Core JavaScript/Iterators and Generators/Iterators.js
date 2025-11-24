// Iterators:


function makeRangeIterator(start = 0, end = Infinity, step = 1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next() {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false };
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    },
  };
  return rangeIterator;
}

const iter = makeRangeIterator(1, 10, 2);

let result = iter.next();
while (!result.done) {
  console.log(result.value); // 1 3 5 7 9
  result = iter.next();
}

console.log("Iterated over sequence of size:", result.value); 
// [5 numbers returned, that took interval in between: 0 to 10]


// Iterators in JavaScript: What, How, Use, When, Where

/**

What is an Iterator?
An iterator is an object that enables traversing a collection (array, string, Map, Set, custom objects) one item at a time.
It follows the Iterator Protocol: it has a next() method that returns an object { value, done }.
Iterators are the foundation for for...of loops, spread syntax [...], and many built-in JS features.
*/
/**

How does it work?
The iterator protocol: any object with a next() method returning { value, done } is an iterator.
The iterable protocol: any object with a [Symbol.iterator]()Symbol.iterator method returning an iterator is iterable.
Built-in iterables: Array, String, Map, Set, TypedArray, arguments, DOM collections.
Custom iterables: You can make your own objects iterable by implementing [Symbol.iterator].
*/


/**

What is it used for?
Iterators provide a uniform way to traverse data structures.
Enable for...of, spread [...], destructuring, Array.from, and more.
Foundation for generators, async iteration, and custom data streams.
*/
/**

When and why to use Iterators?
When you need to process items one-by-one, especially for large or lazy data sources.
When you want to create custom data structures that work with for...of and spread.
When building libraries, frameworks, or APIs that expose collections.
When you want to abstract iteration logic (e.g., paginated APIs, tree traversal).
*/
/**

Where to use Iterators?
Arrays, strings, Maps, Sets, TypedArrays, DOM NodeLists, arguments object.
Custom classes (e.g., LinkedList, Range, Tree, Stream).
Generators (functions using function* syntax) automatically create iterators.
Async iteration (for await...of) for streams, network data, etc.
*/


// Manual iterator usage
const arr = [10, 20, 30];
const it = arr[Symbol.iterator]();
console.log('Manual iterator:', it.next()); // { value: 10, done: false }
console.log('Manual iterator:', it.next()); // { value: 20, done: false }
console.log('Manual iterator:', it.next()); // { value: 30, done: false }
console.log('Manual iterator:', it.next()); // { value: undefined, done: true }

// for...of loop uses iterator automatically
for (const val of arr) {
    console.log('for...of:', val);
}

// Custom iterable object
const customIterable = {
    from: 1,
    to: 3,
    [Symbol.iterator]() {
        let current = this.from;
        const end = this.to;
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
};
for (const num of customIterable) {
    console.log('custom iterable:', num);
}

// Class with iterator
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { value: undefined, done: true };
            }
        };
    }
}
for (const n of new Range(5, 8)) {
    console.log('Range:', n);
}

// Simple test: collect values from Range and check
function testRange() {
    const values = [...new Range(1, 4)];
    if (JSON.stringify(values) === JSON.stringify([1,2,3,4])) {
        console.log('testRange passed:', values);
    } else {
        console.error('testRange failed:', values);
    }
}
testRange();