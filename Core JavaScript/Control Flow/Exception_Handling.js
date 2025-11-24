/*  Exception Handling Statement with Try...Catch
    
    throw statement
        The throw statement allows you to create custom errors by throwing exceptions. You can throw any type of value, but it's common to throw Error objects for better error handling.
    try...catch statement
        The try...catch statement consists of a try block, which contains code that may throw an exception, and a catch block, which contains code to handle the exception if one is thrown.
*/


// throw statement:

function riskyOperation() {
    // Simulating an error
    if (Math.random() > 0.5) {
        throw new Error("Something went wrong!");
    }
    return "Success!";
}

throw "Custom error message"; // Throwing a string   
throw 523;                     // Throwing another number
throw true;                   // Throwing a boolean

throw {                      // Throwing an object
    errorType: "CustomError",
    message: "This is a custom error object."
};

throw {                      // Throwing an object
    message: "Custom error message",
    code: 500
};

throw new Error("This is an Error object"); // Throwing an Error object


throw {
    toString() {
        return `I am a custom error object`;
    },
    name: "ValidationError",
    message: "Invalid input provided."
}

throw {
    
    name: "ValidationError",
    message: "Invalid input provided.",
    toString() {
        return `${this.name}: ${this.message}`;
    }
}

throw {
    
    name: "ValidationError",
    message: "Invalid input provided.",
    toString() {
        return `${this.name}: ${this.message}`;
    },
    toJSON() {
        return {
            name: this.name,
            message: this.message
        };
    }
}




// try...catch statement:

/*

The try...catch statement consists of a try block, which contains one or more statements, and a catch block, 
containing statements that specify what to do if an exception is thrown in the try block.


The catch block specifies an identifier (exception in the preceding syntax) that holds the value specified by the throw statement. 
You can use this identifier to get information about the exception that was thrown.

JavaScript creates this identifier when the catch block is entered. The identifier lasts only for the duration of the catch block. 
Once the catch block finishes executing, the identifier no longer exists.


The purpose of the try...catch statement is to handle exceptions gracefully.

In other words, you want the try block to succeed—but if it does not, you want control to pass to the catch block. 
If any statement within the try block (or in a function called from within the try block) throws an exception, control immediately shifts to the catch block. 
If no exception is thrown in the try block, the catch block is skipped. 
The finally block executes after the try and catch blocks execute but before the statements following the try...catch statement.


Best practice:

It's a good practice to keep the code inside the try block minimal, focusing only on the code that may throw an exception. 
This helps in isolating the error-prone code and makes it easier to handle specific exceptions.

*/

riskyOperation = function() {
    // Simulating an error  
    if (10/0) {
        throw new Error("Something went wrong!");
    }
    return "Success!";
};

try {
    // Code that may throw an exception
    let result = riskyOperation();
    console.log("Operation successful:", result);
} catch (error) {
    console.error("Operation failed:", error);
} 

function getMonthName(monthNumber) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (monthNumber < 1 || monthNumber > 12) {
        throw new RangeError("Month number must be between 1 and 12.");
    }
    return monthNames[monthNumber - 1];
}

try {
    let monthName = getMonthName(15); // Invalid month number
    console.log("Month Name:", monthName);
} catch (error) {
    if (error instanceof RangeError) {
        console.error("Range Error:", error.message);
    } else {
        console.error("Unexpected Error:", error);
    }
}

/*
The finally block contains statements to be executed after the try and catch blocks execute. 
Additionally, the finally block executes before the code that follows the try...catch...finally statement.

It is also important to note that the finally block will execute whether or not an exception is thrown.
If an exception is thrown, however, the statements in the finally block execute even if no catch block handles the exception that was thrown.

You can use the finally block to make your script fail gracefully when an exception occurs. 
For example, you may need to release a resource that your script has tied up.
*/

function openDatabaseConnection() {
    console.log("Database connection opened.");
}

function closeDatabaseConnection() {
    console.log("Database connection closed.");
}

function executeQuery(query) {
    console.log("Executing query:", query);
    // Simulating a database error
    if (query === "SELECT * FROM users") {
        throw new Error("Database error occurred.");
    }
}

try {
    openDatabaseConnection();
    // Perform database operations
    executeQuery("SELECT * FROM users");
} catch (error) {
    console.error("Database operation failed:", error);
} finally {
    closeDatabaseConnection(); // Ensure the database connection is closed
}

// Note: If the finally block returns a value, this value becomes the return value of the entire try...catch...finally production, 
// regardless of any return statements in the try and catch blocks.

function testFinallyReturn() {
    try {
        // Code that may throw an exception
        riskyOperation();
    } catch (error) {
        console.error("Operation failed:", error);
    } finally {
        return "Finally block executed.";
    }
}

let result = testFinallyReturn();
console.log(result); // Output: "Finally block executed."
// Note: The return value from the finally block overrides any return value from the try or catch blocks.

/*  Best Practices for Exception Handling

1. Use Specific Error Types: When throwing errors, use specific error types (e.g., TypeError, RangeError) to provide more context about the error.
2. Keep Try Blocks Minimal: Limit the code within try blocks to only the statements that may throw exceptions. This makes it easier to identify and handle errors.
3. Handle Errors Gracefully: Provide meaningful error messages and consider the user experience when an error occurs.
4. Clean Up Resources: Use finally blocks to release resources (e.g., file handles, database connections) regardless of whether an error occurred.
5. Document Error Handling: Clearly document how errors are handled in your code, including any custom error types and recovery strategies.
6. Avoid Silent Failures: Ensure that errors are logged or reported appropriately, rather than failing silently.

By following these best practices, you can create robust JavaScript applications that handle exceptions effectively and maintain a good user experience.

*/




// Utilizing Error Object Properties

try {
    // Code that may throw an exception
    riskyOperation();
} catch (error) {
    console.error("Operation failed:", error);
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
} finally {
    console.log("Cleanup actions can be performed here.");
}   

// Custom Error Classes

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

function validateAge(age) {
    if (age < 0 || age > 120) {
        throw new ValidationError("Age must be between 0 and 120.");
    }

    return true;
}

try {
    validateAge(150); // Invalid age
} catch (error) {
    if (error instanceof ValidationError) {
        console.error("Validation Error:", error.message);
    } else {
        console.error("Unexpected Error:", error);
    }
}