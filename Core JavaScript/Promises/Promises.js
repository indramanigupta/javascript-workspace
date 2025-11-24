// Promise: A Comprehensive Guide
// ==============================================================================
//
// WHAT IS A PROMISE?
// A Promise is an object representing the eventual completion (or failure) of
// an asynchronous operation and its resulting value. It's a placeholder for a
// value that may not be available yet, but will be resolved at some point in
// the future.
//
// A Promise is in one of three states:
//   1. PENDING: Initial state; operation hasn't completed yet
//   2. FULFILLED: Operation completed successfully; has a result value
//   3. REJECTED: Operation failed; has a reason (error)
//
// Once a promise is settled (fulfilled or rejected), it cannot change states.
//
// ==============================================================================
// HOW DOES IT WORK?
// ==============================================================================
//
// A Promise is created with a constructor that takes an executor function
// with two parameters: resolve and reject.
//
// Syntax: new Promise((resolve, reject) => { ... })
//
// The executor function is called immediately when the Promise is created.
// Inside, you either:
//   - Call resolve(value) to fulfill the promise with a value
//   - Call reject(reason) to reject the promise with an error
//   - Do nothing (promise stays pending forever, usually a mistake)
//
// Example Basic Promise:

const basicPromise = new Promise((resolve, reject) => {
  console.log('Promise executor runs immediately');
  setTimeout(() => {
    resolve('Success! Data received');
  }, 1000);
});

console.log('Promise created:', basicPromise); // Promise { <pending> }

// Consuming a promise: .then() and .catch()
basicPromise
  .then((value) => {
    console.log('Fulfilled:', value); // Runs when promise resolves
  })
  .catch((error) => {
    console.log('Rejected:', error); // Runs when promise rejects
  });

// ==============================================================================
// WHAT IS A PROMISE USED FOR?
// ==============================================================================
//
// Promises are used for handling asynchronous operations in a clean, chainable way:
//   1. Network requests (fetch, API calls)
//   2. File I/O operations
//   3. Database queries
//   4. Timers and delays
//   5. Any operation that takes time and returns a result later
//
// Why use Promises instead of callbacks?
//   - Avoid "callback hell" (deeply nested callbacks)
//   - Better readability and error handling
//   - Chainable operations (.then() chaining)
//   - Built-in error propagation (.catch())

// ==============================================================================
// WHEN TO USE PROMISES
// ==============================================================================
//
// Use promises when:
//   - Making async operations (network, file I/O, timers)
//   - You need to wait for multiple operations sequentially
//   - You want to chain multiple async steps
//   - You need clear error handling
//
// Example: Simulating an API call

function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({id: userId, name: 'Indra Gupta', email: 'indra@example.com'});
      } else {
        reject(new Error('Invalid userId'));
      }
    }, 500);
  });
}

fetchUserData(1)
  .then((user) => {
    console.log('User fetched:', user);
    return user.id; // Can chain promises
  })
  .then((userId) => {
    console.log('User ID:', userId);
  })
  .catch((error) => {
    console.log('Error:', error.message);
  });

// ==============================================================================
// WHERE TO USE PROMISES
// ==============================================================================
//
// 1. HTTP Requests (fetch API returns a Promise)

fetch('https://jsonplaceholder.typicode.com/users/1')
  .then((response) => response.json())
  .then((data) => console.log('Fetched user:', data.name))
  .catch((error) => console.log('Fetch error:', error));

// 2. File Operations (Node.js fs.promises)
// const fs = require('fs').promises;
// fs.readFile('file.txt', 'utf8')
//   .then((data) => console.log(data))
//   .catch((error) => console.log('Read error:', error));

// 3. Timers and Delays
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

delay(2000)
  .then(() => console.log('2 seconds have passed'))
  .catch((error) => console.log('Error:', error));

// ==============================================================================
// ADVANCED PROMISE PATTERNS
// ==============================================================================

// 1. Promise.all() - Wait for all promises to fulfill (or any to reject)
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(() => resolve('done'), 100));
const promise3 = fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((res) => res.json());

Promise.all([promise1, promise2, promise3])
  .then(([result1, result2, result3]) => {
    console.log('All promises fulfilled:', result1, result2, result3.id);
  })
  .catch((error) => console.log('One promise rejected:', error));

// 2. Promise.race() - Returns the result of the first settled promise
const racePromise1 = new Promise((resolve) => setTimeout(() => resolve('first'), 100));
const racePromise2 = new Promise((resolve) => setTimeout(() => resolve('second'), 200));

Promise.race([racePromise1, racePromise2])
  .then((result) => console.log('Race winner:', result)); // 'first'

// 3. Promise.allSettled() - Waits for all promises to settle (fulfil or reject)
const settledPromise1 = Promise.resolve('success');
const settledPromise2 = Promise.reject('error');

Promise.allSettled([settledPromise1, settledPromise2])
  .then((results) => {
    console.log('All settled:', results);
    // [
    //   { status: 'fulfilled', value: 'success' },
    //   { status: 'rejected', reason: 'error' }
    // ]
  });

// 4. Promise.any() - Returns the first fulfilled promise (ignores rejections)
const anyPromise1 = Promise.reject('error1');
const anyPromise2 = Promise.resolve('success');

Promise.any([anyPromise1, anyPromise2])
  .then((result) => console.log('First fulfilled:', result)); // 'success'

// ==============================================================================
// COMMON MISTAKES WITH PROMISES
// ==============================================================================

// Mistake 1: Not returning from .then()
// This breaks the chain:
Promise.resolve(5)
  .then((x) => x * 2) // Returns undefined if you don't return
  .then((x) => console.log('Value:', x)); // Logs: undefined

// Correct way:
Promise.resolve(5)
  .then((x) => x * 2) // Returns 10
  .then((x) => console.log('Value:', x)); // Logs: 10

// Mistake 2: Not catching errors
// Promise rejection without .catch() causes unhandled rejection warning
Promise.reject('Error')
  .catch((error) => console.log('Caught:', error));

// Mistake 3: Creating a "pyramid of promises" (anti-pattern)
// Avoid:
// promise1
//   .then((result1) => {
//     return promise2(result1)
//       .then((result2) => {
//         return promise3(result2)
//           .then((result3) => {
//             // Deeply nested
//           });
//       });
//   });
// Use async/await instead (modern approach)

// ==============================================================================
// MODERN ALTERNATIVE: async/await
// ==============================================================================
// async/await is syntactic sugar over promises, making code look synchronous

async function getUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json();
    console.log('User via async/await:', user.name);
    return user;
  } catch (error) {
    console.log('Error in async/await:', error);
  }
}

// Call async function (returns a promise)
getUser(1);