// Memoization
// -----------
// Memoization is an optimization technique that stores the results of expensive
// function calls and returns the cached result when the same inputs occur again.
// It trades memory for speed by avoiding redundant calculations.

// Definition & How It Works
// -------------------------
// When a function is called with specific arguments, its result is computed and
// stored in a cache (usually an object or Map). On subsequent calls with the same
// arguments, the cached result is returned instead of recomputing it.
// This is particularly useful for pure functions (functions with no side effects).

// Example 1: Basic Memoization with Closure
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log(`  [cache hit] ${key}`);
      return cache[key];
    }
    console.log(`  [computing] ${fn.name}(${args.join(', ')})`);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Expensive function: factorial
function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

const memoFactorial = memoize(factorial);
console.log('Basic Memoization:');
console.log('factorial(5):', memoFactorial(5)); // computing
console.log('factorial(5):', memoFactorial(5)); // cache hit
console.log('factorial(6):', memoFactorial(6)); // computing (needs 6)
console.log('factorial(6):', memoFactorial(6)); // cache hit

// Example 2: Memoization with Multiple Arguments
function add(a, b) {
  return a + b;
}

const memoAdd = memoize(add);
console.log('\nMemoization with multiple args:');
console.log('add(2, 3):', memoAdd(2, 3)); // computing
console.log('add(2, 3):', memoAdd(2, 3)); // cache hit
console.log('add(3, 2):', memoAdd(3, 2)); // computing (different order = different key)

// Example 3: Fibonacci - Classic Use Case
// Without memoization, fibonacci has exponential time complexity O(2^n)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoFib = memoize(fibonacci);
console.log('\nFibonacci with memoization:');
console.log('fib(10):', memoFib(10)); // computing many calls
console.log('fib(11):', memoFib(11)); // computing fib(11), but fib(10) cached
console.log('fib(10):', memoFib(10)); // cache hit

// Example 4: Memoization with Custom Cache Key
// For complex objects, JSON.stringify may not work well
function memoizeWithCustomKey(fn, keyGenerator) {
  const cache = {};
  return function(...args) {
    const key = keyGenerator(...args);
    if (key in cache) {
      console.log(`  [cache hit] key: ${key}`);
      return cache[key];
    }
    console.log(`  [computing] ${fn.name} with key: ${key}`);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function getUserById(userId) {
  // Simulate expensive database lookup
  return { id: userId, name: `User${userId}` };
}

const memoGetUser = memoizeWithCustomKey(getUserById, (id) => `user_${id}`);
console.log('\nMemoization with custom key:');
console.log('getUser(1):', memoGetUser(1)); // computing
console.log('getUser(1):', memoGetUser(1)); // cache hit
console.log('getUser(2):', memoGetUser(2)); // computing

// Example 5: Memoization with Time-to-Live (TTL)
// Cache expires after a certain time
function memoizeWithTTL(fn, ttlMs = 5000) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttlMs) {
      console.log(`  [cache hit] ${key}`);
      return cached.value;
    }
    
    console.log(`  [computing] ${fn.name}(${args.join(', ')})`);
    const result = fn(...args);
    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  };
}

function expensiveAPI(query) {
  return `Result for "${query}"`;
}

const memoAPI = memoizeWithTTL(expensiveAPI, 1000); // 1 second TTL
console.log('\nMemoization with TTL (1 second):');
console.log('api("search"):', memoAPI('search')); // computing
console.log('api("search"):', memoAPI('search')); // cache hit
// Wait 1.1 seconds in real world; here we just show the pattern
setTimeout(() => {
  console.log('api("search") after TTL:', memoAPI('search')); // recomputing
}, 100); // Note: this timing is illustrative; real TTL would require waiting

// Example 6: Memoization with Maximum Cache Size (LRU-like)
function memoizeWithMaxSize(fn, maxSize = 10) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log(`  [cache hit] ${key}`);
      // Move to end (LRU pattern)
      cache.delete(key);
      cache.set(key, fn(...args));
      return cache.get(key);
    }
    
    console.log(`  [computing] ${fn.name}(${args.join(', ')})`);
    const result = fn(...args);
    cache.set(key, result);
    
    // Remove oldest entry if cache exceeds max size
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
      console.log(`  [evicted] ${firstKey}`);
    }
    
    return result;
  };
}

function expensiveComputation(x) {
  return x * x * x;
}

const memoCompute = memoizeWithMaxSize(expensiveComputation, 3);
console.log('\nMemoization with max cache size (3):');
console.log('compute(1):', memoCompute(1)); // computing
console.log('compute(2):', memoCompute(2)); // computing
console.log('compute(3):', memoCompute(3)); // computing
console.log('compute(4):', memoCompute(4)); // computing, evicts oldest (1)
console.log('compute(1):', memoCompute(1)); // computing again (was evicted)

// Example 7: Class-Based Memoization
class MemoizedFunction {
  constructor(fn) {
    this.fn = fn;
    this.cache = new Map();
    this.hits = 0;
    this.misses = 0;
  }

  call(...args) {
    const key = JSON.stringify(args);
    if (this.cache.has(key)) {
      this.hits++;
      console.log(`  [cache hit] ${key}`);
      return this.cache.get(key);
    }
    
    this.misses++;
    console.log(`  [computing] ${this.fn.name}(${args.join(', ')})`);
    const result = this.fn(...args);
    this.cache.set(key, result);
    return result;
  }

  stats() {
    const total = this.hits + this.misses;
    const hitRate = total > 0 ? (this.hits / total * 100).toFixed(2) : 0;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: `${hitRate}%`,
      size: this.cache.size
    };
  }

  clear() {
    this.cache.clear();
    console.log('  [cache cleared]');
  }
}

function power(base, exp) {
  return Math.pow(base, exp);
}

const memoPower = new MemoizedFunction(power);
console.log('\nClass-based memoization with stats:');
console.log('power(2, 10):', memoPower.call(2, 10));
console.log('power(2, 10):', memoPower.call(2, 10));
console.log('power(2, 11):', memoPower.call(2, 11));
console.log('power(2, 10):', memoPower.call(2, 10));
console.log('Stats:', memoPower.stats());

// Why Use Memoization?
// --------------------
// 1. Performance: Avoid redundant, expensive computations
// 2. Reduce API calls: Cache results from external APIs
// 3. Optimize recursive functions: Drastically improve time complexity (e.g., Fibonacci)
// 4. Improve user experience: Faster response times in UI applications
// 5. Scale efficiently: Reduce database queries and server load
// 6. Trade memory for speed: Accept higher memory usage for better performance

// When to Use Memoization
// -----------------------
// - Pure functions: Only memoize functions with no side effects (same input = same output)
// - Expensive computations: Mathematical calculations, sorting, searching
// - Recursive functions: Especially with overlapping subproblems (dynamic programming)
// - API calls: Cache results from network requests
// - DOM queries: Cache element lookups
// - Selectors/filters: Cache frequently used data transformations
// - Rendering: In React/Vue, memoize expensive render computations

// Where to Use Memoization
// -------------------------
// - Algorithm optimization: Fibonacci, factorial, dynamic programming problems
// - Web APIs: Cache fetch() results or database queries
// - React/Vue: useCallback, useMemo, computed properties
// - Performance-critical sections: Hot loops, frequently called functions
// - Data processing: Parsing, formatting, validation operations

// Best Practices
// ---------------
// - Only memoize pure functions (deterministic, no side effects)
// - Be mindful of cache size to avoid excessive memory usage
// - Use custom key generators for complex arguments (objects, functions)
// - Consider TTL (time-to-live) for data that changes over time
// - Monitor cache hit/miss rates to validate effectiveness
// - Clear cache when underlying data changes
// - Avoid memoizing functions with many unique argument combinations

// Common Pitfalls
// ---------------
// 1. Memoizing impure functions: Results change unpredictably
// 2. Memory leaks: Unbounded cache growth; use max size or TTL
// 3. Key collisions: Different args producing the same key (use better key generator)
// 4. Stale data: Cache not invalidated when upstream data changes
// 5. Over-memoization: Caching overhead exceeds computation savings

