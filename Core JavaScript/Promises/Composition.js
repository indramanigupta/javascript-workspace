// Composition: What it is, how it works, and practical examples
// --------------------------------------------------------------------
// Overview:
// "Composition" in programming is the process of combining simple functions
// or operations to build more complex behavior. Instead of writing one big
// function, you compose smaller functions that each do one job. Composition
// improves readability, testability, and reuse.

// Key ideas:
// - Function composition: f(g(x)) combine functions so output of one is input of next
// - Pipe (left-to-right) vs compose (right-to-left)
// - Currying: transform functions so they accept arguments one at a time
// - Promise composition: compose async operations that return promises
// - Middleware composition: chainable handlers (e.g., Express/Koa style)

// --------------------------------------------------------------------
// Basic function composition
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const add1 = (n) => n + 1;
const mul2 = (n) => n * 2;

const addThenMul = compose(mul2, add1); // mul2(add1(x))
const mulThenAdd = pipe(mul2, add1);    // add1(mul2(x))

console.log('compose(mul2, add1)(5) =', addThenMul(5)); // (5+1)*2 = 12
console.log('pipe(mul2, add1)(5) =', mulThenAdd(5));    // (5*2)+1 = 11

// --------------------------------------------------------------------
// Currying (useful for partial application and composition)
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...more) => curried.apply(this, args.concat(more));
  };
};

const add = (a, b) => a + b;
const curriedAdd = curry(add);
const addFive = curriedAdd(5);
console.log('addFive(10) =', addFive(10)); // 15

// --------------------------------------------------------------------
// Composing synchronous functions with multiple args
// Helper to lift a function to accept the output of another
const lift = (fn) => (g) => (...args) => fn(g(...args));

const sum = (a, b) => a + b;
const double = (n) => n * 2;
const doubleSum = lift(double)(sum); // double(sum(a,b))
console.log('doubleSum(2,3) =', doubleSum(2, 3)); // (2+3)*2 = 10

// --------------------------------------------------------------------
// Promise composition (composing async functions)
// A small composeAsync that chains functions returning promises
const composeAsync = (...fns) => (arg) => fns.reduceRight((p, f) => p.then(f), Promise.resolve(arg));

const asyncAdd1 = async (n) => n + 1;
const asyncMul2 = async (n) => n * 2;

const composedAsync = composeAsync(asyncMul2, asyncAdd1); // asyncMul2(asyncAdd1(x))
composedAsync(5).then((res) => console.log('composedAsync result =', res)); // (5+1)*2 = 12

// Alternatively a pipeAsync (left-to-right)
const pipeAsync = (...fns) => (arg) => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));
const pipedAsync = pipeAsync(asyncAdd1, asyncMul2); // asyncMul2(asyncAdd1(x))
pipedAsync(5).then((res) => console.log('pipedAsync result =', res));

// --------------------------------------------------------------------
// Middleware-style composition (Koa-like)
// Each middleware receives context and next(), returns a Promise
function composeMiddleware(middlewares) {
  return function (ctx) {
    let index = -1;
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      const fn = middlewares[i];
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  };
}

// Example middleware
const mw1 = async (ctx, next) => { ctx.log.push('mw1 start'); await next(); ctx.log.push('mw1 end'); };
const mw2 = async (ctx, next) => { ctx.log.push('mw2 start'); await next(); ctx.log.push('mw2 end'); };
const mw3 = async (ctx, next) => { ctx.log.push('mw3'); await next(); };

const composed = composeMiddleware([mw1, mw2, mw3]);
const ctx = { log: [] };
composed(ctx).then(() => console.log('middleware log =', ctx.log));

// --------------------------------------------------------------------
// Practical uses of composition
// - Build pipelines: data transformations (map/filter/reduce chain)
// - Combine small pure functions for clarity and testability
// - Compose async steps (APIs, DB calls) while keeping code modular
// - Middleware stacks (HTTP servers, routers, processing pipelines)

// When to use composition
// - When you can express logic as a sequence of small, focused operations
// - When you want to improve reuse, testability, and readability
// - When building frameworks or pipeline-based systems (middleware)

// Where to use composition
// - Functional utilities and libraries
// - Request/response middleware in web servers
// - Processing pipelines (ETL, data streams)
// - Reactive/event systems where small handlers are composed

// --------------------------------------------------------------------
// Advanced notes & gotchas
// - Order matters: compose (right-to-left) vs pipe (left-to-right)
// - Be careful with functions that change shapes of data (use adapters/lifts)
// - For async composition, preserve error handling (use try/catch in async fns)
// - Avoid over-composition that hurts readability; balance clarity and reuse





// -------------------- Concurrency helpers examples --------------------

/**
 * There are four composition tools 
 * for running asynchronous operations concurrently: 
 * Promise.all(), Promise.allSettled(), Promise.any(), and Promise.race().
 */
// Helper: wait(value, ms, {reject}) -> resolves or rejects after ms
function wait(value, ms = 100, { reject = false } = {}) {
  return new Promise((resolve, rejectFn) => {
    setTimeout(() => (reject ? rejectFn(value) : resolve(value)), ms);
  });
}

// 1) Promise.all() - resolves when all fulfill, rejects on first rejection
const allP1 = wait('A', 200);
const allP2 = wait('B', 150);
const allP3 = wait('C', 100);
Promise.all([allP1, allP2, allP3])
  .then(results => console.log('Promise.all results:', results))
  .catch(err => console.log('Promise.all rejected:', err));

// Example where one rejects
Promise.all([wait('ok', 100), wait('bad', 50, { reject: true })])
  .then(console.log)
  .catch(err => console.log('Promise.all (with rejection) ->', err));

// 2) Promise.allSettled() - waits for all to settle and returns status objects
Promise.allSettled([wait('A', 100), wait('B', 50, { reject: true }), wait('C', 150)])
  .then(results => {
    console.log('Promise.allSettled results:');
    console.log(results);
  });

// 3) Promise.any() - resolves with first fulfilled value, rejects only if all reject
Promise.any([wait('fail1', 100, { reject: true }), wait('ok', 200), wait('fail3', 50, { reject: true })])
  .then(value => console.log('Promise.any fulfilled with:', value))
  .catch(err => {
    // AggregateError on Node contains .errors
    console.log('Promise.any rejected (AggregateError):', err && err.errors ? err.errors : err);
  });

// Example where all reject
Promise.any([wait('e1', 20, { reject: true }), wait('e2', 40, { reject: true })])
  .then(console.log)
  .catch(agg => console.log('Promise.any all rejected errors:', agg && agg.errors ? agg.errors : agg));

// 4) Promise.race() - settles with the first settled promise (resolve or reject)
Promise.race([wait('err', 50, { reject: true }), wait('ok', 200)])
  .then(v => console.log('Promise.race resolved:', v))
  .catch(e => console.log('Promise.race rejected with:', e));

// Usage notes printed for clarity
console.log('\n--- Concurrency helpers demo started ---');

// Export utilities for reuse
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { compose, pipe, curry, composeAsync, pipeAsync, composeMiddleware };
}

