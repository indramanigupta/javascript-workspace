// Block Statement - 
// A block statement is used to group zero or more statements. The block is delimited by a pair of curly brackets {}. 
// Any variable defined inside a block is local to the block and can only be accessed from within the block.

{
    let x = 10;
    let y = 20;
    let z = x + y;
    console.log("The sum of x and y is: " + z);
}

{
    // Nested Block Statement
    let a = 5;
    {
        let b = 10;
        let c = a + b;
        console.log("The sum of a and b is: " + c);
    }
    var d = 15; // 'var' is function or globally(script)-scoped, so 'd' will be accessible outside this block
}

console.log("The value of d is: " + d); // Accessible here since 'd' is declared with 'var'

// Note: The variable 'x', 'y', 'z', 'a', 'b', and 'c' are not accessible outside their respective blocks.

var m = 10;
{
    {
        const o = 30;
        var m = 40; // This 'm' is different from the outer 'm'
    }
}

console.log("Outside blocks: m = " + m); // Accessible here since 'm' is declared with 'var'
// Output: Outside blocks: m = 40

// The following lines would throw ReferenceError if uncommented, as 'n' and 'o' are block-scoped

// This scoping effect can be mitigated by using let or const.

// Control Flow with Block Statements :



// Conditional Statement with Blocks:

// Example of block statement in control flow

/*Best practice
In general, it's good practice to always use block statements—especially when nesting if statements:
*/

let score = 85;
if (score >= 50) {
    let result = "Pass";
    console.log("You have " + result + "ed the exam.");
} else {
    let result = "Fail";
    console.log("You have " + result + "ed the exam.");
}

// Note: The variable 'result' is not accessible outside the if-else blocks.

//In general it's good practice to not have an if...else with an assignment like x = y as a condition:

let a = 10;
let b = 20;
if (a = b) { // Assignment inside condition
    console.log("This will always execute because a is assigned the value of b, which is truthy.");
}

// Instead, use a comparison operator:
if (a === b) { // Comparison
    console.log("a is equal to b.");
} else {
    console.log("a is not equal to b.");
}

/*Best practice:

Falsy values:

The following values evaluate to false (also known as Falsy values):

false
undefined
null
0
NaN
the empty string ("")


All other values—including all objects—evaluate to true when passed to a conditional statement.

*/



const x = new Boolean(false);

if (x) {
    // this condition evaluates to true because x is an object
    console.log("This line will be executed because x is an object, and all objects are truthy.");
} else {
    // this block will not be executed because the condition is true
    console.log("This line will not be executed.");
}

function checkData(){
    if(document.form1.threeChar.value.length === 3){
        // Valid input
        console.log("Input is valid.");
        return true;
    } 
    alert(`Input must be exactly 3 characters long. You entered ${document.form1.threeChar.value} which is not valid.`);
    return false;
}




// Switch Statement with Blocks:


// Example of block statement in switch case

switch (players.length) {
    case 0: {
        console.log("No players available.");   
        break;
    }case 1: {
        console.log("One player available.");
        break;
    }case 2: {
        console.log("Two players available.");
        break;
    }default: {
        console.log("More than two players available.");
    }
}


// Note: Each case block is enclosed in curly braces {} to create a block statement.
switch (new Date().getDay()) {
    case 0:
        console.log("Today is Sunday");
    case 1:
        console.log("Today is Monday");
    case 2:
        console.log("Today is Tuesday");
    case 3:
        console.log("Today is Wednesday");
    case 4:
        console.log("Today is Thursday");
    case 5:
        console.log("Today is Friday");
    case 6:
        console.log("Today is Saturday");
}



// In the above example, since there are no break statements, all cases after the matched case will be executed (fall-through behavior).


switch(fruitType){
    case "Apple": {
        console.log("You selected Apple.");
        break;
    }
    case "Banana": {
        console.log("You selected Banana.");
        break;
    }
    case "Orange": {
        console.log("You selected Orange.");
        break;
    }
    default: {
        console.log(`Sorry, we are out of ${fruitType}.`);
    }
}