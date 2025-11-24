// The await operator is used to wait for a Promise and get its fulfillment value. 
// It can only be used inside an async function or at the top level of a module.

// await is usually used to unwrap promises by passing a Promise as the expression. 
// Using await pauses the execution of its surrounding async function until the promise is settled 
// (that is, fulfilled or rejected). When execution resumes, 
// the value of the await expression becomes that of the fulfilled promise.

/**
 * If the promise is rejected, the await expression throws the rejected value. 
 * The function containing the await expression will appear in the stack trace of the error. 
 * Otherwise, if the rejected promise is not awaited or is immediately returned, 
 * the caller function will not appear in the stack trace.
 */

/**
 * What is await?

Definition: await is an operator that pauses execution of an async function until a Promise settles (fulfills or rejects). It returns the fulfilled value or throws the rejection reason.
Syntactic role: await is syntactic sugar over Promises that makes asynchronous code read like synchronous code.

How it works (mechanics):

await can only be used:
inside an async function, or
at the top-level of an ES module (top-level await) in environments that support it.
When the interpreter hits await promise:
the async function suspends and returns a pending Promise to its caller;
other JS tasks can run; the event loop is not blocked;
when the awaited promise settles, the async function resumes in a microtask with the resolved value (or throws if rejected).
await always waits for the value (if you await a non-Promise, it’s converted to a resolved Promise).
Each await yields control — awaiting several tasks sequentially is slower than running them in parallel via Promise.all.

What is it used for / benefits:

Make asynchronous logic read and be written like synchronous code.
Avoid deeply nested callbacks and long .then() chains.
Easier to write try/catch-based error handling for async flows.
Better for sequential async workflows where later steps depend on earlier results.

When to use await:

Use await when you need the result of an async operation before continuing.
Use it for sequential steps where each step depends on the previous step’s result.
Avoid await when you can run multiple independent async tasks in parallel — prefer Promise.all.

Where to use await:

Inside async function bodies.
In module top-level (if your environment supports top-level await, e.g. Node ESM or modern browsers).
Not allowed in plain scripts (non-module top-level) in many environments.
 */

// ---------------- runnable examples (no external network) ----------------

// Helper: small delay that returns a Promise
function delay(value, ms = 100) {
	return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// Basic example
async function basicAwaitExample() {
	console.log('basicAwaitExample: start');
	const result = await delay('hello', 100);
	console.log('basicAwaitExample: awaited result =', result);
}
basicAwaitExample();

// Error handling with try/catch
async function errorHandlingExample() {
	try {
		await Promise.reject(new Error('simulated failure'));
	} catch (err) {
		console.log('errorHandlingExample: caught error ->', err.message);
	}
}
errorHandlingExample();

// Sequential vs parallel example
function fetchA() { return delay('A', 200); }
function fetchB() { return delay('B', 150); }

async function sequentialVsParallel() {
	const t0 = Date.now();
	const a = await fetchA();
	const b = await fetchB();
	console.log('sequentialVsParallel: sequential results', a, b, 'time', Date.now() - t0, 'ms');

	const t1 = Date.now();
	const [pA, pB] = await Promise.all([fetchA(), fetchB()]);
	console.log('sequentialVsParallel: parallel results', pA, pB, 'time', Date.now() - t1, 'ms');
}
sequentialVsParallel();

// Concurrency in loops example
async function process(item) {
	await delay(null, 50);
	return `processed:${item}`;
}

async function loopConcurrency() {
	const items = [1,2,3,4,5];
	const seqStart = Date.now();
	const seqResults = [];
	for (const it of items) {
		seqResults.push(await process(it)); // awaits each one-by-one
	}
	console.log('loopConcurrency: sequential results', seqResults, 'time', Date.now() - seqStart, 'ms');

	const parStart = Date.now();
	const tasks = items.map(it => process(it));
	const parResults = await Promise.all(tasks);
	console.log('loopConcurrency: parallel results', parResults, 'time', Date.now() - parStart, 'ms');
}
loopConcurrency();

// Awaiting non-Promise values
async function awaitNonPromise() {
	const x = await 42; // x === 42, immediate
	console.log('awaitNonPromise: x =', x);
}
awaitNonPromise();

// Microtask note: await continuation runs as a microtask
async function microtaskDemo() {
	console.log('microtaskDemo: before await');
	await null;
	console.log('microtaskDemo: after await (microtask)');
}
microtaskDemo();
setTimeout(() => console.log('microtaskDemo: setTimeout (macrotask)'), 0);

// End of runnable examples

