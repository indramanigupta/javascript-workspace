// Error Handling:

// by using - using keyword:
// NOTE: The `using` keyword requires Node.js with Explicit Resource Management support (v20+)
// and must be run with experimental flag. Examples below are commented out for compatibility.


async function readUntill(stream, text) {
    // Use `using` instead of `await using` because `releaseLock is synchronous`

    using reader = stream.getReader();
    let chunk = await reader.read();

    while (!chunk.done && chunk.value !== text) {
        console.log(chunk.toUpperCase());
        chunk = await reader.read();
    }
}

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("a");
    controller.enqueue(null);
    controller.enqueue("b");
    controller.enqueue("c");
    controller.close();
  },
});

readUntil(stream, "b")
  .catch((e) => console.error(e)) // TypeError: chunk.toUpperCase is not a function
  .then(() => {
    const anotherReader = stream.getReader();
    // Successfully creates another reader
  });

class MyReader {
  [Symbol.dispose]() {
    throw new Error("Failed to release lock");
  }
}

function doSomething() {
  using reader = new MyReader();
  throw new Error("Failed to read");
}

try {
  doSomething();
} catch (e) {
  console.error(e); // SuppressedError: An error was suppressed during disposal
}

class MyReaderMulti {
  [Symbol.dispose]() {
    throw new Error("Failed to release lock on reader");
  }
}

class MyWriterMulti {
  [Symbol.dispose]() {
    throw new Error("Failed to release lock on writer");
  }
}

function doSomethingMulti() {
  using reader = new MyReaderMulti();
  using writer = new MyWriterMulti();
  throw new Error("Failed to read");
}

try {
  doSomethingMulti();
} catch (e) {
  console.error(e); // SuppressedError: An error was suppressed during disposal
  console.error(e.suppressed); // SuppressedError: An error was suppressed during disposal
  console.error(e.error); // Error: Failed to release lock on reader
  console.error(e.suppressed.suppressed); // Error: Failed to read
  console.error(e.suppressed.error); // Error: Failed to release lock on writer
}


/**Note:
 * 
 ** The reader is released last, so its error is the latest 
    and therefore suppresses everything else: it shows up as e.error.
 ** The writer is released first, so its error is later than 
    the original exiting error, but earlier than the reader error: 
    it shows up as e.suppressed.error.
 ** The original error about "Failed to read" is the earliest error, 
    so it shows up as e.suppressed.suppressed.
 */

/**
 * Browser-only examples (commented for Node.js compatibility):
 * These require DOM and browser APIs like URL.createObjectURL and AbortController
 */


// Automatically releasing object URLs:

const downloadButton = document.getElementById("download-button");
const exampleBlob = new Blob(["example data"]);

downloadButton.addEventListener("click", () => {
  using disposer = new DisposableStack();
  const link = document.createElement("a");
  const url = disposer.adopt(
    URL.createObjectURL(exampleBlob),
    URL.revokeObjectURL,
  );

  link.href = url;
  link.download = "example.txt";
  link.click();
});


// Automatically cancelling in-progress requests:

async function getAllData(urls) {
  using disposer = new DisposableStack();
  const { signal } = disposer.adopt(new AbortController(), (controller) =>
    controller.abort(),
  );

  // Fetch all URLs in parallel
  // Automatically cancel any incomplete requests if any request fails
  const pages = await Promise.all(
    urls.map((url) =>
      fetch(url, { signal }).then((response) => {
        if (!response.ok)
          throw new Error(
            `Response error: ${response.status} - ${response.statusText}`,
          );
        return response.text();
      }),
    ),
  );
  return pages;
}


/**
 * Here are the key components of the resource management system:

 *** using and await using declarations for automatic resource disposal.
 *** The disposable and async disposable protocols, using the Symbol.dispose 
    and Symbol.asyncDispose respectively, for resources to implement.
 *** The DisposableStack and AsyncDisposableStack objects for cases 
    where using and await using are not suitable.
 */

// ============================================================
// Additional Error Handling Patterns with Resource Management
// ============================================================

/**
 * 1. Try-Catch-Finally with Resource Cleanup (Traditional Approach)
 * This is the classic pattern before `using` was available.
 */

class FileHandle {
  constructor(filename) {
    this.filename = filename;
    this.isOpen = true;
    console.log(`[FileHandle] Opened: ${filename}`);
  }

  read() {
    if (!this.isOpen) throw new Error('File is closed');
    console.log(`[FileHandle] Reading from ${this.filename}`);
    return 'file contents';
  }

  close() {
    if (this.isOpen) {
      console.log(`[FileHandle] Closed: ${this.filename}`);
      this.isOpen = false;
    }
  }
}

function traditionalErrorHandling() {
  const file = new FileHandle('example.txt');
  try {
    const content = file.read();
    // Simulate an error
    throw new Error('Read operation failed');
  } catch (error) {
    console.error('Error caught:', error.message);
  } finally {
    file.close(); // Always called, even if error occurs
  }
}

/**
 * 2. Error Recovery and Partial Cleanup
 * Handle errors gracefully and clean up only the resources that need it.
 */

class DatabaseConnection {
  constructor(host) {
    this.host = host;
    this.connected = true;
    console.log(`[DB] Connected to ${host}`);
  }

  query(sql) {
    if (!this.connected) throw new Error('DB not connected');
    if (sql.includes('ERROR')) throw new Error('Query execution failed');
    console.log(`[DB] Query: ${sql}`);
    return [{ id: 1, data: 'result' }];
  }

  close() {
    if (this.connected) {
      console.log(`[DB] Disconnected from ${this.host}`);
      this.connected = false;
    }
  }
}

async function errorRecoveryPattern() {
  const db = new DatabaseConnection('localhost');
  try {
    try {
      const result = db.query('SELECT * FROM ERROR');
    } catch (error) {
      console.log('Query failed, attempting fallback query...');
      const fallback = db.query('SELECT * FROM fallback_table');
      return fallback;
    }
  } finally {
    db.close();
  }
}

/**
 * 3. Error Context and Chaining
 * Wrap errors to provide context about where they occurred.
 */

class CustomError extends Error {
  constructor(message, originalError, context) {
    super(message);
    this.name = 'CustomError';
    this.originalError = originalError;
    this.context = context;
    this.timestamp = new Date();
  }
}

function errorChainingExample() {
  const resource = new FileHandle('data.txt');
  try {
    try {
      throw new Error('Low-level IO error');
    } catch (error) {
      throw new CustomError(
        'Failed to read file',
        error,
        { filename: 'data.txt', operation: 'read' }
      );
    }
  } catch (error) {
    console.error('Caught error:', error.message);
    console.error('Original error:', error.originalError?.message);
    console.error('Context:', error.context);
  } finally {
    resource.close();
  }
}

/**
 * 4. Async Error Handling with `await using`
 * Resources that require async cleanup (e.g., closing network connections).
 */

class AsyncResource {
  constructor(name) {
    this.name = name;
    this.open = true;
    console.log(`[AsyncResource] Initialized: ${name}`);
  }

  async [Symbol.asyncDispose]() {
    console.log(`[AsyncResource] Async cleanup starting for ${this.name}`);
    // Simulate async cleanup (e.g., flushing buffers, closing connections)
    await new Promise(resolve => setTimeout(resolve, 100));
    this.open = false;
    console.log(`[AsyncResource] Async cleanup completed for ${this.name}`);
  }

  async process() {
    if (!this.open) throw new Error('Resource is closed');
    console.log(`[AsyncResource] Processing...`);
    await new Promise(resolve => setTimeout(resolve, 50));
    return 'processed data';
  }
}

async function asyncErrorHandlingExample() {
  try {
    await using resource = new AsyncResource('connection');
    const result = await resource.process();
    console.log('Result:', result);
    // Simulate an error
    throw new Error('Processing failed after cleanup');
  } catch (error) {
    console.error('Async error caught:', error.message);
  }
  // resource is cleaned up here, even though error occurred
}

/**
 * 5. Multiple Resources with Error Handling
 * Properly clean up multiple resources even when errors occur.
 */

async function multipleResourcesExample() {
  let reader, writer;
  try {
    reader = new FileHandle('input.txt');
    writer = new FileHandle('output.txt');

    const data = reader.read();
    if (!data) throw new Error('No data to write');

    console.log('Processing successful');
  } catch (error) {
    console.error('Error during processing:', error.message);
    // Specific error handling
    if (error.message.includes('closed')) {
      console.log('Resource was already closed');
    }
  } finally {
    // Cleanup both resources in reverse order
    if (writer) writer.close();
    if (reader) reader.close();
  }
}

/**
 * 6. Nested Error Handling with Resource Management
 * Handle errors at different levels of abstraction.
 */

async function nestedErrorHandlingExample() {
  const outerResource = new FileHandle('outer.txt');
  try {
    try {
      const innerResource = new FileHandle('inner.txt');
      try {
        throw new Error('Inner operation failed');
      } finally {
        innerResource.close();
      }
    } catch (innerError) {
      console.error('Inner error handled, attempting recovery...');
      // Recovery logic
    }
  } catch (outerError) {
    console.error('Outer error:', outerError.message);
  } finally {
    outerResource.close();
  }
}

/**
 * 7. Error Handling with Resource Cleanup Validation
 * Verify that cleanup was successful even if the main operation fails.
 */

class ValidatedResource {
  constructor(id) {
    this.id = id;
    this.cleaned = false;
    console.log(`[ValidatedResource] Created with id: ${id}`);
  }

  [Symbol.dispose]() {
    console.log(`[ValidatedResource] Disposing resource ${this.id}`);
    this.cleaned = true;
  }

  validate() {
    if (this.cleaned) throw new Error('Resource already cleaned');
    return true;
  }
}

function validatedCleanupExample() {
  const resource = new ValidatedResource('RES-001');
  try {
    resource.validate();
    throw new Error('Operation failed');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    resource[Symbol.dispose]();
  }

  try {
    resource.validate();
  } catch (error) {
    console.error('Validation after cleanup failed:', error.message);
  }
}

// ============================================================
// Demo Runner
// ============================================================

if (typeof require !== 'undefined' && require.main === module) {
  (async () => {
    console.log('=== Error Handling Examples ===\n');

    console.log('1. Traditional Error Handling:');
    traditionalErrorHandling();

    console.log('\n2. Error Recovery Pattern:');
    await errorRecoveryPattern();

    console.log('\n3. Error Chaining:');
    errorChainingExample();

    console.log('\n4. Async Error Handling:');
    await asyncErrorHandlingExample();

    console.log('\n5. Multiple Resources:');
    await multipleResourcesExample();

    console.log('\n6. Nested Error Handling:');
    await nestedErrorHandlingExample();

    console.log('\n7. Validated Cleanup:');
    validatedCleanupExample();

    console.log('\n=== Examples Complete ===');
  })();
}
