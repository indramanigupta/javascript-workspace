// Enumerability and ownership of properties
// ----------------------------------------
// This file explains what property enumerability and ownership (own vs inherited)
// mean in JavaScript, why they matter, and gives runnable examples.

// Definitions
// - Enumerability: a property attribute (`enumerable: true|false`) that controls
//   whether a property appears in property-enumeration operations such as
//   `for...in`, `Object.keys`, and `JSON.stringify` (only own enumerable string-keyed props).
// - Ownership: whether a property is an "own" property (exists directly on the object)
//   or an inherited property (comes from the prototype chain). Use
//   `Object.prototype.hasOwnProperty.call(obj, prop)` to check ownership.

// Why it matters
// - Control API surface: library authors keep methods non-enumerable so user code
//   iterating over data doesn't see internal methods.
// - Serialization: `JSON.stringify` serializes only own enumerable string-keyed props.
// - Copying/merging: `Object.assign` copies only own enumerable properties.
// - Iteration correctness: differentiate own data vs prototype methods when iterating.

// Common APIs
// - `Object.defineProperty(obj, prop, { enumerable: false })`
// - `Object.keys(obj)` -> own enumerable string keys
// - `Object.getOwnPropertyNames(obj)` -> own string keys (enumerable or not)
// - `Object.getOwnPropertySymbols(obj)` -> own symbol keys
// - `Reflect.ownKeys(obj)` -> all own keys (string + symbol, enumerable or not)
// - `Object.getOwnPropertyDescriptor(obj, prop)` -> descriptor including `enumerable`
// - `for (const k in obj)` -> iterates enumerable properties from obj and prototype chain

// Example 1: for...in vs Object.keys vs hasOwnProperty
const proto = { inherited: 1 };
const obj = Object.create(proto);
obj.own = 2;

console.log('for...in iteration:');
for (const k in obj) console.log(' ', k);

console.log('Object.keys:', Object.keys(obj));
console.log('hasOwnProperty(inherited):', Object.prototype.hasOwnProperty.call(obj, 'inherited'));
console.log('hasOwnProperty(own):', Object.prototype.hasOwnProperty.call(obj, 'own'));

// Example 2: define non-enumerable property to hide internal fields
const user = { name: 'Alice', age: 30 };
Object.defineProperty(user, '_internalId', { value: 'id-123', enumerable: false, configurable: true });

console.log('\nUser keys (own enumerable):', Object.keys(user));
console.log('All own property names:', Object.getOwnPropertyNames(user));
console.log('JSON.stringify(user):', JSON.stringify(user));

// Example 3: Symbols are not returned by Object.keys or for...in
const sym = Symbol('secret');
user[sym] = 'hidden';
console.log('\nSymbol keys (Reflect.ownKeys):', Reflect.ownKeys(user));

// Example 4: cloning while preserving enumerability and descriptors
const source = { a: 1 };
Object.defineProperty(source, 'hidden', { value: 'x', enumerable: false, writable: false });

const cloneShallow = Object.assign({}, source); // loses non-enumerables and descriptors
const cloneFull = Object.create(Object.getPrototypeOf(source), Object.getOwnPropertyDescriptors(source));

console.log('\ncloneShallow keys:', Object.keys(cloneShallow));
console.log('cloneFull keys (all own):', Object.getOwnPropertyNames(cloneFull));
console.log('cloneFull descriptor for hidden:', Object.getOwnPropertyDescriptor(cloneFull, 'hidden'));

// Example 5: copying including symbols and non-enumerables
function deepCloneWithDescriptors(o) {
	return Object.create(Object.getPrototypeOf(o), Object.getOwnPropertyDescriptors(o));
}

const deep = deepCloneWithDescriptors(user);
console.log('\nDeep clone keys:', Reflect.ownKeys(deep));

// Use cases summary (short):
// - Library authors: place methods on prototypes with enumerable: false so instances' enumerations show only data.
// - Serialization control: exclude sensitive or computed fields by setting enumerable: false.
// - Migration/clone utilities: use descriptors to preserve exact property behaviour.

// Best practices
// - Prefer `Object.keys` / `Object.entries` for data iteration (not `for...in`).
// - Use `Symbol` or non-enumerable properties for internal metadata.
// - When writing polyfills, add properties with `enumerable: false`.
// - Use `Object.getOwnPropertyDescriptors` + `Object.create` to clone objects preserving attributes.

// Quick runnable check: run `node` on this file to see the console output.

// ============================================================
// Exercises (short)
// ============================================================
// 1) Hide a property: add a non-enumerable property `token` to `user` with value
//    `'t-xyz'`. Then verify `Object.keys(user)` does not include `token` but
//    `Object.getOwnPropertyNames(user)` does. (Hint: `Object.defineProperty`)

// 2) Symbol privacy: add a `Symbol('meta')` key to `user` with a value and show
//    that `for...in` and `Object.keys` do not reveal the symbol, but
//    `Reflect.ownKeys(user)` shows it. (Hint: create a symbol and use it as a key)

// 3) Own vs inherited: create an object `child` whose prototype has property
//    `p = 1`. Add an own property `q = 2`. Write a small loop that collects only
//    own enumerable properties (hint: use `Object.keys` or `hasOwnProperty`).

// 4) Preserve descriptors: Create an object `orig` with a non-enumerable
//    property `secret` (writable: false). Create `copy` such that `secret` is
//    also non-enumerable and not writable on the copy. (Hint: use
//    `Object.getOwnPropertyDescriptors` and `Object.create`.)

// Quick answers / hints (run after trying the exercises):
// 1) `Object.defineProperty(user, 'token', { value: 't-xyz', enumerable: false })`
//    `Object.keys(user)` -> no 'token'; `Object.getOwnPropertyNames(user)` -> includes 'token'
// 2) `const s = Symbol('meta'); user[s] = { created: Date.now() }; Reflect.ownKeys(user)` -> includes symbol
// 3) `Object.keys(child)` or `for (const k of Object.keys(child)) { ... }` to collect own enumerable
// 4) `const copy = Object.create(Object.getPrototypeOf(orig), Object.getOwnPropertyDescriptors(orig))`



// Traversing object properties
// --------------------------------
// This section demonstrates common techniques to traverse an object's properties,
// including own vs inherited, enumerable vs non-enumerable, and symbol keys.

// Setup example with prototype chain, enumerable, non-enumerable and symbol keys
const base = { baseProp: 'B' };
Object.defineProperty(base, 'hiddenBase', { value: 'HB', enumerable: false });

const item = Object.create(base);
item.a = 1; // own enumerable
Object.defineProperty(item, 'b', { value: 2, enumerable: false }); // own non-enumerable
const secret = Symbol('secret');
item[secret] = 'sym';

console.log('\n--- Traversal examples ---');

// 1) for...in: iterates enumerable string-keyed properties, including inherited ones
console.log('\nfor...in (enumerable, own + inherited):');
for (const k in item) console.log(' ', k);

// 2) Object.keys: own enumerable string keys only
console.log('\nObject.keys (own enumerable):', Object.keys(item));

// 3) Object.getOwnPropertyNames: own string keys, enumerable or not
console.log('Object.getOwnPropertyNames (own string keys):', Object.getOwnPropertyNames(item));

// 4) Object.getOwnPropertySymbols: own symbol keys
console.log('Object.getOwnPropertySymbols (own symbol keys):', Object.getOwnPropertySymbols(item));

// 5) Reflect.ownKeys: all own keys (string + symbol, enumerable or not)
console.log('Reflect.ownKeys (all own keys):', Reflect.ownKeys(item));

// 6) Inspect descriptors to filter by enumerability
console.log('\nOwn enumerable descriptors:');
for (const k of Reflect.ownKeys(item)) {
	const desc = Object.getOwnPropertyDescriptor(item, k);
	if (desc) console.log(' ', k.toString(), '=>', { enumerable: desc.enumerable, configurable: desc.configurable, writable: desc.writable });
}

// 7) Traversing prototype chain: list all properties found on object and prototypes (deduplicated)
function traversePrototypeChain(obj) {
	const seen = new Set();
	let cur = obj;
	while (cur && cur !== Object.prototype) {
		for (const name of Object.getOwnPropertyNames(cur)) {
			if (!seen.has(name)) {
				seen.add(name);
				console.log('Found', name, 'on', cur === obj ? 'self' : 'proto');
			}
		}
		cur = Object.getPrototypeOf(cur);
	}
}

console.log('\nTraverse prototype chain (deduplicated):');
traversePrototypeChain(item);

// 8) When to prefer which traversal:
// - Use `Object.keys` / `Object.entries` when iterating data for application logic.
// - Use `for...in` only if you explicitly want inherited enumerable properties.
// - Use `Reflect.ownKeys` / `getOwnPropertyNames` / `getOwnPropertySymbols` for tooling,
//   object inspectors, or cloning utilities that need all keys.

/**
 * 
 ** in
 ** for...in
 ** Object.prototype.hasOwnProperty()
 ** Object.prototype.propertyIsEnumerable()
 ** Object.getOwnPropertyNames()
 ** Object.getOwnPropertySymbols()
 ** Object.keys()
 ** Object.getOwnPropertyDescriptors()
 ** Object.hasOwn()
 ** Reflect.ownKeys()
 */

// Obtaining properties by enumerability/ownership

/**
 *** Detection can occur by SimplePropertyRetriever.theGetMethodYouWant(obj).includes(prop)
 *** Iteration can occur by SimplePropertyRetriever.theGetMethodYouWant(obj).forEach((value, prop) => {}); (or use filter(), map(), etc.)
 */