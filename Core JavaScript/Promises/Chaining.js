// Promise Chaining:

doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log(`Got the final result: ${finalResult}`);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);


const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);

function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Other things to do before completion of the promise
      console.log("Did something");
      // The fulfillment value of the promise
      resolve("https://example.com/");
    }, 200);
  });
}



doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);



doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);


// Note: Arrow function expressions can have an implicit return; 
// so, () => x is short for () => { return x; }.


const listOfIngredients = [];

doSomething()
  .then((url) => {
    // `return` keyword now included in front of fetch call.
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        listOfIngredients.push(data);
      });
  })
  .then(() => {
    console.log(listOfIngredients);
    // listOfIngredients will now contain data from fetch call.
  });


doSomething()
  .then((url) => fetch(url))
  .then((res) => res.json())
  .then((data) => {
    listOfIngredients.push(data);
  })
  .then(() => {
    console.log(listOfIngredients);
  });



/**
 * Using async/await can help you write code that's more intuitive and resembles synchronous code. 
 * Below is the same example using async/await:
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
 * 
 */

async function logIngredients() {
  const url = await doSomething();
  const res = await fetch(url);
  const data = await res.json();
  listOfIngredients.push(data);
  console.log(listOfIngredients);
}


// Error handling:








// ==============================================================================
// PROMISE CHAINING: A Comprehensive Guide
// ==============================================================================
//
// WHAT IS PROMISE CHAINING?
// Promise chaining is the practice of attaching multiple .then() handlers to
// a promise, where each handler receives the result from the previous one.
// This creates a sequential flow of asynchronous operations without "callback hell".
//
// Key concept: Each .then() returns a NEW Promise, allowing you to chain
// additional .then() calls.
//
// Syntax:
// promise
//   .then((result1) => { return result1 + 10; })
//   .then((result2) => { return result2 * 2; })
//   .then((result3) => { console.log(result3); })
//   .catch((error) => { console.error(error); });
//
// ==============================================================================
// HOW DOES PROMISE CHAINING WORK?
// ==============================================================================
//
// 1. First .then() executes when the promise fulfills
// 2. Whatever you RETURN from .then() becomes the value for the next .then()
// 3. If you don't return, the next .then() receives undefined
// 4. If any step throws an error, it jumps to the nearest .catch()
// 5. Each .then() returns a NEW promise (immutability)

// Example: Simple chain with transformations
Promise.resolve(5)
  .then((num) => {
    console.log('Step 1: Received', num);
    return num * 2; // Must return!
  })
  .then((num) => {
    console.log('Step 2: Received', num);
    return num + 10; // Must return!
  })
  .then((num) => {
    console.log('Step 3: Final result:', num); // Should be 20
  });

// ==============================================================================
// WHAT IS PROMISE CHAINING USED FOR?
// ==============================================================================
//
// Promise chaining is used to:
// 1. Perform sequential asynchronous operations
// 2. Pass data from one async operation to the next
// 3. Avoid deeply nested callbacks (callback hell)
// 4. Make code more readable and maintainable
// 5. Handle errors in a centralized way

// Real-world example: Simulating a multi-step user registration process
function validateEmail(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.includes('@')) {
        resolve({email, validated: true});
      } else {
        reject(new Error('Invalid email format'));
      }
    }, 500);
  });
}

function createUser(emailData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({...emailData, userId: 123, username: 'johndoe'});
    }, 500);
  });
}

function sendWelcomeEmail(userData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({...userData, emailSent: true});
    }, 500);
  });
}

// Chain all steps together
validateEmail('john@example.com')
  .then((emailData) => {
    console.log('Email validated:', emailData);
    return createUser(emailData); // Chain to next step
  })
  .then((userData) => {
    console.log('User created:', userData);
    return sendWelcomeEmail(userData); // Chain to next step
  })
  .then((finalData) => {
    console.log('Welcome email sent:', finalData);
  })
  .catch((error) => {
    console.error('Error in chain:', error.message);
  });

// ==============================================================================
// WHEN TO USE PROMISE CHAINING
// ==============================================================================
//
// Use promise chaining when:
// 1. You have sequential async operations (one depends on the previous)
// 2. You need to transform data between steps
// 3. You want to avoid callback hell
// 4. You need centralized error handling
//
// Example: API call chain (get user → get posts → filter → display)

function getUser(userId) {
  return Promise.resolve({id: userId, name: 'Alice'});
}

function getUserPosts(userId) {
  return Promise.resolve([
    {id: 1, title: 'Post 1', userId},
    {id: 2, title: 'Post 2', userId}
  ]);
}

getUser(1)
  .then((user) => {
    console.log('User:', user.name);
    return getUserPosts(user.id); // Pass user.id to next function
  })
  .then((posts) => {
    console.log('Posts count:', posts.length);
    return posts.filter((p) => p.id > 0); // Transform data
  })
  .then((filteredPosts) => {
    console.log('Filtered posts:', filteredPosts);
  });

// ==============================================================================
// WHERE TO USE PROMISE CHAINING
// ==============================================================================
//
// Common scenarios:
//
// 1. HTTP requests (fetch multiple API endpoints)
// 2. File operations (read file → process → write result)
// 3. Database queries (query user → query posts → query comments)
// 4. Complex workflows (validate → save → notify → log)

// Example: Chaining fetch requests
// fetch('/api/user/1')
//   .then((response) => response.json())
//   .then((user) => {
//     console.log('User:', user);
//     return fetch(`/api/user/${user.id}/posts`);
//   })
//   .then((response) => response.json())
//   .then((posts) => {
//     console.log('Posts:', posts);
//   })
//   .catch((error) => console.error('Fetch error:', error));

// ==============================================================================
// ADVANCED CHAINING PATTERNS
// ==============================================================================

// Pattern 1: Conditional chaining (branching logic)
Promise.resolve(10)
  .then((num) => {
    if (num > 5) {
      return Promise.resolve(num * 2);
    } else {
      return Promise.resolve(num + 1);
    }
  })
  .then((result) => console.log('Conditional result:', result));

// Pattern 2: Chaining with error recovery
Promise.reject(new Error('Step 1 failed'))
  .catch((error) => {
    console.log('Caught error:', error.message);
    return 'recovered'; // Recover from error
  })
  .then((result) => {
    console.log('After recovery:', result);
    return result + ' - continuing';
  })
  .then((final) => console.log('Final:', final));

// Pattern 3: Parallel operations within a chain
Promise.resolve({userId: 1})
  .then((data) => {
    // Start multiple async operations in parallel
    const getUserPosts = Promise.resolve(['post1', 'post2']);
    const getUserComments = Promise.resolve(['comment1', 'comment2']);
    
    return Promise.all([getUserPosts, getUserComments])
      .then(([posts, comments]) => ({
        ...data,
        posts,
        comments
      }));
  })
  .then((result) => {
    console.log('Parallel results:', result);
  });

// ==============================================================================
// COMMON MISTAKES WITH CHAINING
// ==============================================================================

// Mistake 1: Not returning from .then()
// This breaks the chain:
Promise.resolve(5)
  .then((num) => {
    num * 2; // WRONG: no return
  })
  .then((num) => {
    console.log('Value:', num); // Will print: undefined
  });

// Correct:
Promise.resolve(5)
  .then((num) => {
    return num * 2; // CORRECT: returns value
  })
  .then((num) => {
    console.log('Value:', num); // Will print: 10
  });

// Mistake 2: Not catching errors in chains
// Unhandled rejection can cause warnings:
Promise.reject('Error!')
  // Missing .catch() here!
  .then((result) => console.log(result));

// Correct:
Promise.reject('Error!')
  .catch((error) => console.log('Caught:', error));

// Mistake 3: Forgetting that each .then() returns a new promise
const p = Promise.resolve(1);
const p1 = p.then((x) => x + 1);
const p2 = p.then((x) => x + 2);
// p1 and p2 are different promises with different results!

// ==============================================================================
// PROMISE CHAINING VS ASYNC/AWAIT
// ==============================================================================
//
// Chaining (traditional):
Promise.resolve(5)
  .then((x) => x * 2)
  .then((x) => x + 10)
  .then((x) => console.log(x));

// Async/await (modern, more readable):
// async function example() {
//   let x = await Promise.resolve(5);
//   x = x * 2;
//   x = x + 10;
//   console.log(x);
// }
// example();
//
// Both do the same thing, but async/await reads like synchronous code.