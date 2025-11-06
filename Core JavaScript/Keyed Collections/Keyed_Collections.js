// Keyed Collections:
// In JavaScript, "keyed collections" are data structures that store values by keys, not just by numeric index.
// The two main types are Map (key-value pairs, any type of key) and Set (unique values, any type).

// -------------------- Map --------------------
// Map is a collection of keyed data items, like an Object, but allows keys of any type.
const map = new Map();
map.set('a', 1);
map.set(42, 'answer');
const objKey = {x: 10};
map.set(objKey, 'object value');

console.log('map.get("a") =', map.get('a')); // 1
console.log('map.get(42) =', map.get(42)); // 'answer'
console.log('map.get(objKey) =', map.get(objKey)); // 'object value'

// Iterating a Map
for (const [key, value] of map) {
	console.log('Map entry:', key, value);
}

// Map preserves insertion order and supports size, delete, has, clear
console.log('map.size =', map.size);
map.delete(42);
console.log('map.has(42) =', map.has(42)); // false

// Advanced: Map from objects, using complex keys
const user1 = {id: 1};
const user2 = {id: 2};
const visits = new Map();
visits.set(user1, 5);
visits.set(user2, 3);
console.log('visits.get(user1) =', visits.get(user1)); // 5

// -------------------- Set --------------------
// Set is a collection of unique values (no duplicates), any type.
const set = new Set();
set.add(1);
set.add(2);
set.add(2); // duplicate, ignored
set.add('hello');
set.add({x: 1});

console.log('set.has(2) =', set.has(2)); // true
console.log('set.size =', set.size); // 4

// Iterating a Set
for (const value of set) {
	console.log('Set value:', value);
}

// Advanced: Set for deduplication
const arr = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(arr)];
console.log('unique array =', unique); // [1,2,3,4,5]

// Set supports delete, has, clear
set.delete(1);
console.log('set.has(1) =', set.has(1)); // false

// -------------------- WeakMap and WeakSet (advanced) --------------------
// WeakMap: like Map, but keys must be objects and are weakly referenced (not preventing garbage collection)
// WeakSet: like Set, but only objects, weakly referenced
// These are used for memory-sensitive caches or private data in classes
const weakMap = new WeakMap();
const secret = {};
weakMap.set(secret, 'hidden');
console.log('weakMap.get(secret) =', weakMap.get(secret)); // 'hidden'

const weakSet = new WeakSet();
const obj = {};
weakSet.add(obj);
console.log('weakSet.has(obj) =', weakSet.has(obj)); // true

// WeakMap/WeakSet do not prevent their keys from being garbage collected and do not support iteration.

// -------------------- Advanced Patterns --------------------

// 1. Map for Memoization (caching expensive function results)
function memoize(fn) {
	const cache = new Map();
	return function(arg) {
		if (cache.has(arg)) {
			return cache.get(arg);
		}
		const result = fn(arg);
		cache.set(arg, result);
		return result;
	};
}

// Example: Memoized Fibonacci
const fib = memoize(function(n) {
	if (n <= 1) return n;
	return fib(n - 1) + fib(n - 2);
});
console.log('Memoized fib(10) =', fib(10)); // 55

// 2. Set Operations: Union, Intersection, Difference
function union(setA, setB) {
	return new Set([...setA, ...setB]);
}
function intersection(setA, setB) {
	return new Set([...setA].filter(x => setB.has(x)));
}
function difference(setA, setB) {
	return new Set([...setA].filter(x => !setB.has(x)));
}

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);
console.log('Union:', [...union(setA, setB)]); // [1,2,3,4,5,6]
console.log('Intersection:', [...intersection(setA, setB)]); // [3,4]
console.log('Difference (A - B):', [...difference(setA, setB)]); // [1,2]

// 3. Map as a frequency counter (counting occurrences)
function countFrequencies(arr) {
	const freq = new Map();
	for (const item of arr) {
		freq.set(item, (freq.get(item) || 0) + 1);
	}
	return freq;
}
const freqMap = countFrequencies(['a', 'b', 'a', 'c', 'b', 'a']);
console.log('Frequency map:', Array.from(freqMap.entries())); // [['a',3],['b',2],['c',1]]

