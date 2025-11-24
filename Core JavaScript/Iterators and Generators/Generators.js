// Generators: What, How, When, Where, and Examples (basic → advanced)
// ------------------------------------------------------------------
// WHAT IS A GENERATOR?
// A generator is a special kind of function that can pause execution and
// later resume, producing a sequence of values over time. In JavaScript,
// generators are declared with `function*` and use the `yield` keyword to
// produce values.
// Generators have a return() method 
// that returns the given value and finishes the generator itself.
//
// A generator function, when called, returns a generator object that
// implements the iterator protocol (has a `next()` method returning
// `{ value, done }`). This makes generators iterable and usable with
// `for...of`, spread syntax, and other iteration mechanisms.
//
// WHY USE GENERATORS?
// - Lazy evaluation: produce values on demand (useful for large or
//   infinite sequences)
// - Maintain internal state across yields without external variables
// - Implement coroutines/cooperative multitasking (send values back into
//   generator via `next(arg)`) and pipelines
// - Work with async iteration (`async function*` and `for await...of`)
//
// BASIC USAGE
// ------------------------------------------------------------------
function* simpleGenerator() {
	yield 1;
	yield 2;
	yield 3;
}

const g = simpleGenerator();
console.log('g.next() ->', g.next()); // { value: 1, done: false }
console.log('g.next() ->', g.next()); // { value: 2, done: false }
console.log('g.next() ->', g.next()); // { value: 3, done: false }
console.log('g.next() ->', g.next()); // { value: undefined, done: true }

// Generators are iterable
for (const v of simpleGenerator()) console.log('for...of value:', v);

// PRODUCING A RANGE LAZILY
function* range(start = 0, end = Infinity, step = 1) {
	for (let i = start; i <= end; i += step) {
		yield i;
	}
}

console.log('range 1..5:', [...range(1,5)]);

// ADVANCED: Sending values INTO a generator (two-way communication)
function* accumulator() {
	let total = 0;
	while (true) {
		// receive a number from next(value)
		const x = yield total;
		if (typeof x !== 'number') break;
		total += x;
	}
	return total; // final return value appears as { value: returnVal, done: true }
}

const acc = accumulator();
console.log('acc.next() =>', acc.next());      // start, yields 0
console.log('acc.next(5) =>', acc.next(5));    // send 5, previous yield returns 5? shows new total next
console.log('acc.next(3) =>', acc.next(3));    // accumulate
console.log('acc.next("stop") =>', acc.next('stop')); // stops generator, returns final total

// DELEGATION: yield* forwards iteration to another iterable
function* inner() {
	yield 'a';
	yield 'b';
}
function* outer() {
	yield 1;
	yield* inner(); // delegate to inner generator
	yield 2;
}
console.log('delegate yield* =>', [...outer()]); // [1, 'a', 'b', 2]

// COMPOSITION: build pipelines of generators (lazy transform)
const { mapGen, filterGen } = require('./composeUtils');

const nums = range(1, 10);
const evens = filterGen(nums, n => n % 2 === 0);
const doubled = mapGen(evens, n => n * 2);
console.log('composed generator result:', [...doubled]); // lazy pipeline

// ASYNC GENERATORS & for-await-of (ES2018+)
// async function* produces an async iterator that yields Promises; consume with `for await...of`
async function* asyncRange(n) {
	for (let i = 0; i < n; i++) {
		// simulate async work per item
		await new Promise(r => setTimeout(r, 50));
		yield i;
	}
}

async function consumeAsync() {
	const results = [];
	for await (const x of asyncRange(5)) {
		results.push(x);
	}
	console.log('async generator consumed:', results);
}
consumeAsync();

// GENERATORS AS COROUTINES / STATE MACHINES
// You can implement a simple parser/state machine with generators.
function* tokenizer(text) {
	const tokens = text.split(/\s+/);
	for (const t of tokens) yield t;
}

const tok = tokenizer('this is a test');
console.log('tokens:', [...tok]);

// WHEN AND WHY TO USE GENERATORS
// - Produce/consume large or infinite sequences lazily 
//  (avoid building large arrays)
// - Implement complex iteration protocols or pipelines with internal state
// - Build coroutine-like flows where the caller and generator exchange data
// - Implement async streams using async generators and `for await...of`

// WHERE TO USE GENERATORS
// - Data processing pipelines, ETL tasks, streaming parsers
// - Implementing custom iterables (Range, Tree traversals, Graph traversals)
// - Web servers or frameworks that use middleware-like generator composition
// - Wrapping I/O or network streams where values arrive over time

// GOTCHAS & BEST PRACTICES
// - Generators are single-use: once exhausted, you must create a new generator instance
// - Be careful when combining generators that consume the same underlying iterator
// - Prefer async iterators for real async streaming sources
// - Use `yield*` to delegate and keep composition clean

// End of Generators guide and examples



// yield:


// Advanced generators
// Generators compute their yielded values on demand, which allows them to efficiently represent sequences that are expensive to compute

/**
// What yield Is

Definition: yield is the keyword used inside a generator function (function*) 
to produce a value and pause the function’s execution. 
The generator can later be resumed with .next() 
(optionally passing a value back in).
Role: It turns a function into an iterator by repeatedly 
returning { value, done } results.

// How yield Works (mechanics)

Inside function* each yield <expr> suspends execution and returns <expr> 
as the value of the iterator result.
Calling gen.next() resumes execution until the next yield (or return).
The optional argument to next(arg) becomes the result of 
the suspended yield expression inside the generator.
When the generator finishes (falls off end or return), 
the iterator returns { value: <returnVal>, done: true }.

// Why & When to Use yield

Lazy generation: produce values on demand (large or infinite sequences) 
to save memory and computation.
Stateful iteration: keep local state across yields without external closures.
Coroutines / two-way communication: send data into the generator via next(value).
Pipelines: build composable, step-by-step data transformations 
(map/filter via generators).
Async streaming: with async function* + for await...of for asynchronous sequences.

// Where to Use yield (common scenarios)

Generating ranges or infinite sequences (e.g., stream of timestamps).
Lazy data processing pipelines (ETL, logs, large files).
Tokenizers and parsers (pull-based parsing).
Coroutine-style state machines and cooperative workflows.
Async streams (network or I/O data arriving over time).

 */

//Basic examples

//Simple generator that yields values
function* simpleGen() {
  yield 'a';
  yield 'b';
  yield 'c';
}
g = simpleGen();
console.log(g.next()); // { value: 'a', done: false }
console.log(g.next()); // { value: 'b', done: false }
console.log([...simpleGen()]); // ['a','b','c'] using iterable behavior

//Lazy range (memory-efficient)

function* range(start=0, end=Infinity, step=1) {
  for (let i = start; i <= end; i += step) yield i;
}
for (const n of range(1,5)) console.log(n); // 1 2 3 4 5

//Two-way communication (send values into generator)

function* accumulator() {
  let total = 0;
  while (true) {
    const x = yield total;        // yield current total, pause
    if (x === undefined) break;   // stop if caller sends nothing
    total += x;                   // resume, update state
  }
  return total;
}
const it = accumulator();
console.log(it.next());      // { value: 0, done: false }
console.log(it.next(5));     // { value: 5, done: false }  (previous yield returned 5)
console.log(it.next(3));     // { value: 8, done: false }
console.log(it.next());      // { value: 8, done: true }   (generator finished, return value)


//Delegation with yield* (compose generators)

function* inner() { yield 'x'; yield 'y'; }
function* outer() {
  yield 1;
  yield* inner(); // delegate iteration to inner
  yield 2;
}
console.log([...outer()]); // [1, 'x', 'y', 2]

//Compose lazy pipeline (map/filter using generator helpers)

function* mapGen(gen, fn) { for (const v of gen) yield fn(v); }
function* filterGen(gen, pred) { for (const v of gen) if (pred(v)) yield v; }

const nums1 = range(1, 10);
const evens1 = filterGen(nums1, n => n % 2 === 0);
const doubled1 = mapGen(evens1, n => n * 2);
console.log([...doubled1]); // [4, 8, 12, 16, 20]


//Async generator + for await...of (streaming async values)

async function* asyncRange(n) {
  for (let i = 0; i < n; i++) {
    await new Promise(r => setTimeout(r, 50)); // simulate async work
    yield i;
  }
}
(async () => {
  for await (const x of asyncRange(3)) {
    console.log('async item', x);
  }
})();

//Advanced example — generator as a simple state machine / tokenizer

function* tokenizer(text) {
  const tokens = text.split(/\s+/);
  for (const t of tokens) yield t;
}
// Use the tokenizer lazily (good for streaming input)
const t = tokenizer('this is a test');
console.log(t.next().value); // 'this'
console.log([...t]); // ['is','a','test']

/*
Best practices & gotchas

Generators are single-use: 
create a fresh generator for new iteration.
yield suspends only the generator function, not the whole thread — other JS runs continue.
To end a generator early from outside, call .return(value) or throw into it with .throw(error).
Use yield* to delegate rather than manually iterating another generator.
Prefer async iterators for true asynchronous streams (I/O).
Avoid overcomplicating control flow with generators when simple async/await or Promises suffice.

*/