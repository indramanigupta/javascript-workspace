// Loops and Iteration

// JavaScript supports different kinds of loops:

// 1. for loop


/*
    When a for loop executes, the following occurs:

    1. The initializing expression initialization, if any, is executed. This expression usually initializes one or more loop counters, 
    but the syntax allows an expression of any degree of complexity. 
    This expression can also declare variables.

    2. The condition expression is evaluated. If the value of condition is true, the loop statements execute. 
    Otherwise, the for loop terminates. (If the condition expression is omitted entirely, the condition is assumed to be true.)

    3. The statement executes. To execute multiple statements, use a block statement ({ }) to group those statements.
    
    4. If present, the update expression afterthought is executed.
    
    5. Control returns to Step 2.
*/

for (let i = 0; i < 5; i++) {
    console.log("For Loop iteration: " + i);
}

/*
// Output: 
        For Loop iteration: 0
        For Loop iteration: 1
        For Loop iteration: 2
        For Loop iteration: 3
        For Loop iteration: 4      
*/


// 2. while loop

/*
    The while statement creates a loop that executes a specified statement
    as long as the test condition evaluates to true. The condition is evaluated before executing the statement.
    
    If the condition is false, the loop terminates and control passes to the statement following the loop.
    
*/

let j = 0; //Cannot redeclare block-scoped variable 'j'.
while (j < 5) {
    console.log("While Loop iteration: " + j);
    j++;
} 
            
/*// Output: 
        While Loop iteration: 0
        While Loop iteration: 1
        While Loop iteration: 2
        While Loop iteration: 3
        While Loop iteration: 4
*/



// 3. do...while loop

/*
    The do...while statement creates a loop that executes a specified statement 
    until the test condition evaluates to false. The condition is evaluated after executing the statement, 
    resulting in the statement executing at least once.
*/

let k = 0;
do {
    console.log("Do...While Loop iteration: " + k);
    k++;
} while (k < 5);

/*// Output: 
        Do...While Loop iteration: 0
        Do...While Loop iteration: 1
        Do...While Loop iteration: 2
        Do...While Loop iteration: 3
        Do...While Loop iteration: 4
*/


// 4. for...in loop (for iterating over object properties)

/*
    The for...in statement iterates a specified variable over all enumerable properties of an object. 
    For each distinct property, statements can be executed.
*/

const obj = {a: 1, b: 2, c: 3};
for (const key in obj) {
    console.log("For...In Loop iteration: " + key + " = " + obj[key]);
}

/*// Output: 
        For...In Loop iteration: a = 1
        For...In Loop iteration: b = 2
        For...In Loop iteration: c = 3
*/  

// 5. for...of loop (for iterating over iterable objects like arrays)

/*
    The for...of statement creates a loop iterating over iterable objects, 
    including: built-in String, Array, array-like objects (e.g., arguments or NodeList), 
    TypedArray, Map, Set, and user-defined iterables.
*/

const arr = [10, 20, 30];
for (const value of arr) {
    console.log("For...Of Loop iteration: " + value);
}

/*// Output: 
        For...Of Loop iteration: 10
        For...Of Loop iteration: 20
        For...Of Loop iteration: 30
*/

// Note: You can use 'break' and 'continue' statements within loops to control the flow of execution.

// Example of 'break' statement

for (let m = 0; m < 10; m++) {
    if (m === 5) {  
        break; // Exit the loop when m is 5
    }
    console.log("Break Example iteration: " + m);
}

/*// Output: 
        Break Example iteration: 0
        Break Example iteration: 1
        Break Example iteration: 2
        Break Example iteration: 3
        Break Example iteration: 4
*/



// Example of 'continue' statement
for (let n = 0; n < 10; n++) {
    if (n % 2 === 0) { 
        continue; // Skip even numbers
    }
    console.log("Continue Example iteration: " + n);
}   
/*// Output: 
        Continue Example iteration: 1
        Continue Example iteration: 3
        Continue Example iteration: 5
        Continue Example iteration: 7
        Continue Example iteration: 9
*/

// labeled statements can be used with loops to control flow more precisely.

/*
    A label provides a statement with an identifier that lets you refer to it elsewhere in your program. 
    For example, you can use a label to identify a loop, and then use the break or continue statements to indicate 
    whether a program should interrupt the loop or continue its execution.
*/

outerLoop: for (let p = 0; p < 3; p++) {
    innerLoop: for (let q = 0; q < 3; q++) {
        if (q === 1) {
            break outerLoop; // Exit both loops when q is 1
        }
        console.log("Outer Loop iteration: " + p + ", Inner Loop iteration: " + q);
    }
}  

/*// Output: 
        Outer Loop iteration: 0, Inner Loop iteration: 0
*/

let x = 5;
let y = 10;
resultLabel: {
    if (x < y) {
        console.log("x is less than y");
        break resultLabel; // Exit the labeled block
    }
    console.log("x is not less than y");
}


/*// Output: 
        x is less than y
*/


// continue statement with label

/*
    You can use the continue statement with a label to skip the current iteration of an outer loop.

    The continue statement can be used to restart a while, do-while, for, or label statement.

    1. When you use continue without a label, 
    it terminates the current iteration of the innermost enclosing while, do-while, or for statement and continues execution of the loop with the next iteration. 
    In contrast to the break statement, continue does not terminate the execution of the loop entirely. 
    In a while loop, it jumps back to the condition. In a for loop, it jumps to the increment-expression.

    2. When you use continue with a label, it applies to the looping statement identified with that label.

*/

outer: for (let r = 0; r < 3; r++) {
    inner: for (let s = 0; s < 3; s++) {
        if (s === 1) {
            continue outer; // Skip the current iteration of the outer loop
        }
        console.log("Outer Loop iteration: " + r + ", Inner Loop iteration: " + s);
    }
}

/*// Output: 
        Outer Loop iteration: 0, Inner Loop iteration: 0
        Outer Loop iteration: 1, Inner Loop iteration: 0
        Outer Loop iteration: 1, Inner Loop iteration: 2
        Outer Loop iteration: 2, Inner Loop iteration: 0
        Outer Loop iteration: 2, Inner Loop iteration: 2
*/


let p = 0;
let q = 10;
checkPandQ: while (p < 4) {
  console.log(p);
  p += 1;
  checkQ: while (q > 4) {
    console.log(q);
    q -= 1;
    if (q % 2 === 0) {
      continue;
    }
    console.log(q, "is odd.");
  }
  console.log("p =", p);
  console.log("q =", q);
}

/*// Output: 
        0
        10
        9 is odd.
        8 is even.
        7 is odd.
        6 is even.
        5 is odd.
        4 is even.
        3 is odd.
        2 is even.
        1 is odd.
        0 is even.
        p = 4
        q = 0
*/


// This concludes the overview of loops and iteration in JavaScript.