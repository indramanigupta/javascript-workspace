/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management
 * Resource management is not exactly the same as memory management, 
 * which is a more advanced topic and usually handled automatically by JavaScript.
 * Resource management is about managing resources that are not automatically 
 * cleaned up by JavaScript. Sometimes, it's okay to have some unused objects 
 * in memory, because they don't interfere with application logic, 
 * but resource leaks often lead to things not working, 
 * or a lot of excess memory usage. Therefore, 
 * this is not an optional feature about optimization, 
 * but a core feature to write correct programs!
 * 
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management
 * 
 */

// Problem: 

/**
 * Let's first look at a few examples of resources that need to be managed:

    **File handles: A file handle is used to read and write bytes in a file. 
    When you are done with it, you must call fileHandle.close(), 
    otherwise the file will remain open, even when the JS object is no longer 
    accessible. As the linked Node.js docs say:

        If a <FileHandle> is not closed using the fileHandle.close() method, 
        it will try to automatically close the file descriptor and emit 
        a process warning, helping to prevent memory leaks. 
        Please do not rely on this behavior because it can be unreliable and 
        the file may not be closed. Instead, always explicitly 
        close <FileHandle>s. Node.js may change this behavior in the future.

    **Network connections: Some connections, such as WebSocket and 
    RTCPeerConnection, need to be closed if no messages are transmitted. 
    Otherwise, the connection remains open, and connection pools 
    are often very limited in size.

    **Stream readers: If you don't call ReadableStreamDefaultReader.releaseLock(), 
    the stream will be locked and does not permit another reader to consume it.
 * 
 * 
*/


const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("a");
    controller.enqueue("b");
    controller.enqueue("c");
    controller.close();
  },
});

async function readUntil(stream, text) {
  const reader = stream.getReader();
  let chunk = await reader.read();

  while (!chunk.done && chunk.value !== text) {
    console.log(chunk);
    chunk = await reader.read();
  }
  // We forgot to release the lock here
}

readUntil(stream, "b").then(() => {
  const anotherReader = stream.getReader();
  // TypeError: ReadableStreamDefaultReader constructor can only
  // accept readable streams that are not yet locked to a reader
});

/**
 * The solution in this case is straightforward: call reader.releaseLock() 
 * at the end of readUntil. But, a few issues still remain:

    Inconsistency: different resources have different ways to release them. 
    For example, we have close(), releaseLock(), disconnect(), etc. 
    The pattern does not generalize.

    Error handling: what happens if the reader.read() call fails? 
    Then readUntil would terminate and never get to the reader.releaseLock() call.
    We can fix this using
 */

async function readUntil(stream, text) {
  const reader = stream.getReader();
  try {
    let chunk = await reader.read();

    while (!chunk.done && chunk.value !== text) {
      console.log(chunk);
      chunk = await reader.read();
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Scoping: in the above example, reader is already closed when we exit the try...finally statement, 
 * but it continues to be available in its scope. This means you may accidentally use it after it's 
 * closed.

 * Multiple resources: if we have two readers on different streams, we have to remember to release 
   both of them. This is a respectable attempt to do so:
 */

const reader1 = stream1.getReader();
const reader2 = stream2.getReader();
try {
  // do something with reader1 and reader2
} finally {
  reader1.releaseLock();
  reader2.releaseLock();
}


reader1 = stream1.getReader();
try {
  const reader2 = stream2.getReader();
  try {
    // do something with reader1 and reader2
  } finally {
    reader2.releaseLock();
  }
} finally {
  reader1.releaseLock();
}

/**
 * You see how a seemingly benign task of calling releaseLock can quickly lead to nested boilerplate code. 
 * This is why JavaScript provides integrated language support for resource management.
 */

/**
 * The using and await using declarations
 * 
 *  They are similar to const, but they automatically release the resource 
 *  when the variable goes out of scope as long as the resource is disposable.
 */

{
  using reader1 = stream1.getReader();
  using reader2 = stream2.getReader();

  // do something with reader1 and reader2

  // Before we exit the block, reader1 and reader2 are automatically released
}

/**
 * This creates a new block scope for the using declarations. 
 * Resources declared with using are automatically freed when they go out of the scope of using, 
 * which, in this case, is whenever we are exiting the block, 
 * either because all statements have executed, 
 * or because an error or return/break/continue was encountered somewhere.
 * 
 * This means using can only be used in a scope that has a clear lifetime—namely, 
 * it cannot be used at the top level of a script, because variables at the 
 * top level of a script are in scope for all future scripts on the page, 
 * which practically means the resource can never be freed if the page never unloads. 
 */

// For demonstration
class MyReader {
  // A wrapper
  [Symbol.dispose]() {
    this.releaseLock();
  }
  releaseLock() {
    // Logic to release resources
  }
}

// OR, an alias
MyReader.prototype[Symbol.dispose] = MyReader.prototype.releaseLock;


/**
 * await:
 * 
 * await using is very similar to using. The syntax tells you that an await happens somewhere—not 
 * when the resource is declared, but actually when it's disposed. 
 * await using requires the resource to be async disposable, 
 * which means it has a [Symbol.asyncDisposable]() method. 
 * This method is called with no arguments and returns a promise that resolves when the cleanup is done. 
 * This is useful when the cleanup is asynchronous, 
 * such as fileHandle.close(), in which case the result of the disposal can only be known asynchronously.
 */

{
  await using fileHandle = open("file.txt", "w");
  await fileHandle.write("Hello");

  // fileHandle.close() is called and awaited
}

/**
 * The DisposableStack and AsyncDisposableStack objects
 * 
 * 
 */

let reader;
if (someCondition) {
  reader = stream.getReader();
} else {
  reader = stream.getReader({ mode: "byob" });
}

if (someCondition) {
  using reader = stream.getReader();
} else {
  using reader = stream.getReader({ mode: "byob" });
}

/**
 * What we want to do is to acquire and register the resource in one scope but dispose it in another. 
 * We can use a DisposableStack for this purpose, 
 * which is an object which holds a collection of disposable resources and which itself is disposable:
 */
{
  using disposer = new DisposableStack();
  let reader;
  if (someCondition) {
    reader = disposer.use(stream.getReader());
  } else {
    reader = disposer.use(stream.getReader({ mode: "byob" }));
  }
  // Do something with reader
  // Before scope exit, disposer is disposed, which disposes reader
}

/**
 * You may have a resource that does not yet implement the disposable protocol, 
 * so it will be rejected by using. In this case, you can use adopt().
 */

{
  using disposer = new DisposableStack();
  // Suppose reader does not have the [Symbol.dispose]() method,
  // then it cannot be used with using.
  // However, we can manually pass a disposer function to disposer.adopt
  const reader = disposer.adopt(stream.getReader(), (reader) =>
    reader.releaseLock(),
  );
  // Do something with reader
  // Before scope exit, disposer is disposed, which disposes reader
}

{
  using disposer = new DisposableStack();
  disposer.defer(() => console.log("All database connections closed"));
  const connection1 = disposer.use(openConnection());
  const connection2 = disposer.use(openConnection());
  // Do something with connection1 and connection2
  // Before scope exit, disposer is disposed, which first disposes connection1
  // and connection2 and then logs the message
}

// You may want to do conditional disposal—
// for example, only dispose claimed resources when an error occurred.
// In this case, you can use move() to preserve the resources which would otherwise be disposed.


class MyResource {
  #resource1;
  #resource2;
  #disposables;
  constructor() {
    using disposer = new DisposableStack();
    this.#resource1 = disposer.use(getResource1());
    this.#resource2 = disposer.use(getResource2());
    // If we made it here, then there were no errors during construction and
    // we can safely move the disposables out of `disposer` and into `#disposables`.
    this.#disposables = disposer.move();
    // If construction failed, then `disposer` would be disposed before reaching
    // the line above, disposing `#resource1` and `#resource2`.
  }
  [Symbol.dispose]() {
    this.#disposables.dispose(); // Dispose `#resource2` and `#resource1`.
  }
}

/**
 * AsyncDisposableStack is like DisposableStack, but for use with async disposable resources. 
 * Its use() method expects an async disposable, its adopt() method expects an async cleanup function, 
 * and its dispose() method expects an async callback. It provides a [Symbol.asyncDispose]() method. 
 * You can still pass it sync resources if you have a mix of both sync and async.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack
 */





// Helpers: small, pragmatic scoped-disposal utilities used for demos below.
function _disposeResourceSync(r) {
  if (r == null) return;
  try {
    if (typeof r[Symbol.dispose] === 'function') return r[Symbol.dispose]();
    if (typeof r.dispose === 'function') return r.dispose();
    if (typeof r.releaseLock === 'function') return r.releaseLock();
    if (typeof r.close === 'function') return r.close();
  } catch (e) {
    console.error('Error during disposal (sync):', e);
  }
}

async function _disposeResourceAsync(r) {
  if (r == null) return;
  try {
    if (typeof r[Symbol.asyncDispose] === 'function') { await r[Symbol.asyncDispose](); return; }
    if (typeof r[Symbol.asyncDisposable] === 'function') { await r[Symbol.asyncDisposable](); return; }
    if (typeof r.close === 'function') { const res = r.close(); if (res && typeof res.then === 'function') await res; return; }
    if (typeof r.dispose === 'function') { const res = r.dispose(); if (res && typeof res.then === 'function') await res; return; }
    if (typeof r.releaseLock === 'function') { r.releaseLock(); return; }
  } catch (e) {
    console.error('Error during disposal (async):', e);
  }
}

function using(resourceFactory, fn) {
  const r = resourceFactory();
  try {
    return fn(r);
  } finally {
    _disposeResourceSync(r);
  }
}

async function usingAsync(resourceFactory, fn) {
  const r = await resourceFactory();
  try {
    return await fn(r);
  } finally {
    await _disposeResourceAsync(r);
  }
}

// --- Demo: Fake file handle to illustrate async disposal ---
class FakeFileHandle {
  constructor(name) { this.name = name; this.closed = false; }
  async write(text) { if (this.closed) throw new Error('file already closed'); console.log(`writing to ${this.name}:`, text); }
  async close() { console.log(`closing ${this.name}`); this.closed = true; }
}

async function demoFile() {
  await usingAsync(async () => new FakeFileHandle('demo.txt'), async (fh) => {
    await fh.write('Hello from demoFile');
  });
}

// --- Demo: read a ReadableStream while ensuring the reader is released ---
async function readWithUsing(s, stopAt) {
  await usingAsync(async () => s.getReader(), async (reader) => {
    let chunk = await reader.read();
    while (!chunk.done) {
      console.log('read chunk', chunk);
      if (chunk.value === stopAt) break;
      chunk = await reader.read();
    }
  });
}

// Run demos when invoked directly via node
if (typeof require !== 'undefined' && require.main === module) {
  (async () => {
    console.log('Running resource-management demos:');
    await demoFile();
    try {
      // `stream` is defined earlier in this file; reuse it if present
      if (typeof stream !== 'undefined') {
        await readWithUsing(stream, 'b');
      } else {
        console.log('No `stream` available to demo readWithUsing.');
      }
    } catch (e) {
      console.error('Demo error:', e);
    }
  })();
}
