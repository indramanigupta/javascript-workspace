// Regular expressions are patterns used to match character combinations in strings.

// In JavaScript, regular expressions are also objects. 
// These patterns are used with the exec() and test() methods of RegExp, and with the match(), matchAll(), replace(), replaceAll(), search(), and split() methods of String.


// Creating a Reqular Expression

//Using a regular expression literal

const re = /ab+c/;

//Or calling the constructor function of the RegExp object
const re1 = new RegExp("ab+c");


// Special characters in regular expressions.

// Character classes:

//Characters / constructs
// [xyz], [^xyz], ., \d, \D, \w, \W, \s, \S, \t, \r, \n, \v, \f, [\b], \0, \cX, \xhh, \uhhhh, \u{hhhh}, x|y

// Assertions:

//Characters / constructs
// ^, $, \b, \B, x(?=y), x(?!y), (?<=y)x, (?<!y)x

// Groups and backreferences :

//Characters / constructs
// (x), (?<Name>x), (?:x), \n, \k<Name>

// Quantifiers:

//Characters / constructs
// x*, x+, x?, x{n}, x{n,}, x{n,m}


//Escaping: 

/*

If you need to use any of the special characters literally (actually searching for a "*", for instance), 
you should escape it by putting a backslash in front of it. For instance, to search for "a" followed by "*" followed by "b", 
you'd use /a\*b/ — the backslash "escapes" the "*", making it literal instead of special.


Similarly, if you're writing a regular expression literal and need to match a slash ("/"), you need to escape that (otherwise, it terminates the pattern). 
For instance, to search for the string "/example/" followed by one or more alphabetic characters, you'd use /\/example\/[a-z]+/i—the backslashes before each slash make them literal.

*/

// Using regular expressions in JavaScript

// exec()	Executes a search for a match in a string. It returns an array of information or null on a mismatch.
// test()	Tests for a match in a string. It returns true or false.
// match()	Returns an array containing all of the matches, including capturing groups, or null if no match is found.
// matchAll()	Returns an iterator containing all of the matches, including capturing groups.
// search()	Tests for a match in a string. It returns the index of the match, or -1 if the search fails.
// replace()	Executes a search for a match in a string, and replaces the matched substring with a replacement substring.
// replaceAll()	Executes a search for all matches in a string, and replaces the matched substrings with a replacement substring.
// split()	Uses a regular expression or a fixed string to break a string into an array of substrings.


const regExp = /d(b+)d/g;
const arr = regExp.exec("cdbbdbsbz");
console.log(arr);


const myArray = /d(b+)d/g.exec("cdbbdbsbz");
console.log(myArray)

const myRe = new RegExp("d(b+)d", "g");
const myArray1 = myRe.exec("cdbbdbsbz");
console.log(myArray1)


const myRe1 = /d(b+)d/g;
const myArray2 = myRe1.exec("cdbbdbsbz");
console.log(`The value of lastIndex is ${myRe.lastIndex}`);
console.log(myArray2);

// "The value of lastIndex is 5"
// Output: [ 'dbbd', 'bb', index: 1, input: 'cdbbdbsbz', groups: undefined ]


const myArray3 = /d(b+)d/g.exec("cdbbdbsbz");
console.log(`The value of lastIndex is ${/d(b+)d/g.lastIndex}`);

// "The value of lastIndex is 0"

// Practical Examples

// 1. Email Validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test("example@email.com")); // true
console.log(emailRegex.test("invalid.email@")); // false

// 2. Phone Number Format (US)
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
console.log(phoneRegex.test("123-456-7890")); // true
console.log(phoneRegex.test("(123) 456-7890")); // true
console.log(phoneRegex.test("12345")); // false

// 3. Password Strength Check
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
console.log(passwordRegex.test("Pass123!")); // true
console.log(passwordRegex.test("weakpass")); // false

// 4. URL Validation
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
console.log(urlRegex.test("https://www.example.com")); // true
console.log(urlRegex.test("invalid-url")); // false

// 5. Using Named Capture Groups (ES2018+)
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = "2025-11-06".match(dateRegex);
console.log(match.groups); // { year: '2025', month: '11', day: '06' }

// 6. Using replace() with Regular Expressions
const text = "John Doe's phone numbers are 123-456-7890 and (987) 654-3210";
const formattedText = text.replace(/\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})/g, "($1) $2-$3");
console.log(formattedText);
// Output: "John Doe's phone numbers are (123) 456-7890 and (987) 654-3210"

// 7. Word Boundary Example
const wordRegex = /\bcat\b/;
console.log(wordRegex.test("cat")); // true
console.log(wordRegex.test("category")); // false
console.log(wordRegex.test("the cat!")); // true

// 8. Using matchAll() for Global Search with Groups
const stringToSearch = "The fox jumped. Then the fox ran. Finally, the fox slept.";
const foxRegex = /the (fox)/gi;
const matches = [...stringToSearch.matchAll(foxRegex)];
console.log(matches.map(match => ({
    fullMatch: match[0],
    group: match[1],
    index: match.index
})));

// 9. Advanced Pattern Matching Examples

// a. Positive Lookahead
const positiveAhead = /Jack(?= Sparrow)/; // Matches "Jack" only if followed by " Sparrow"
console.log(positiveAhead.test("Jack Sparrow")); // true
console.log(positiveAhead.test("Jack Black")); // false

// b. Negative Lookahead
const negativeAhead = /Jack(?! Sparrow)/; // Matches "Jack" only if NOT followed by " Sparrow"
console.log(negativeAhead.test("Jack Black")); // true
console.log(negativeAhead.test("Jack Sparrow")); // false

// c. Positive Lookbehind
const positiveBehind = /(?<=Captain )Jack/; // Matches "Jack" only if preceded by "Captain "
console.log(positiveBehind.test("Captain Jack")); // true
console.log(positiveBehind.test("Doctor Jack")); // false

// d. Negative Lookbehind
const negativeBehind = /(?<!Captain )Jack/; // Matches "Jack" only if NOT preceded by "Captain "
console.log(negativeBehind.test("Doctor Jack")); // true
console.log(negativeBehind.test("Captain Jack")); // false

// e. Combined Lookaround (both ahead and behind)
const complexPattern = /(?<=Mr\. )(?!Smith)\w+/; // Matches any name after "Mr. " except "Smith"
console.log(complexPattern.test("Mr. Jones")); // true
console.log(complexPattern.test("Mr. Smith")); // false

// f. Pattern with Backreference
const repeatedWord = /\b(\w+)\s+\1\b/g; // Matches repeated words
const sentence = "The the quick brown fox fox jumped over the lazy dog dog";
console.log(sentence.match(repeatedWord)); // ['the the', 'fox fox', 'dog dog']

// g. Balanced Groups Matching
const balancedParens = /\(([^()]*)\)/g; // Matches content within parentheses
const mathExpression = "Math: (2 + 3) * (4 - 1)";
console.log([...mathExpression.matchAll(balancedParens)]); // Shows matches of content within parentheses

// h. Unicode Property Escapes (ES2018+)
const emojiRegex = /\p{Emoji}/u; // Matches any emoji character
console.log(emojiRegex.test("👍")); // true
console.log(emojiRegex.test("ABC")); // false

// i. Conditional Pattern Matching
const conditional = /(\d{3})(-)?(?:\d{3}(?:\2\d{4})?)/;
// If hyphen is present after first group, it must be used consistently
console.log(conditional.test("123-456-7890")); // true
console.log(conditional.test("1234567890")); // true
console.log(conditional.test("123-4567890")); // false

// j. Atomic Grouping (Using Positive Lookahead as a Workaround)
const atomicGroup = /(?=(ab+))\1c/;
console.log(atomicGroup.test("abbbc")); // true
console.log(atomicGroup.test("abc")); // true

//

/*
    Tools
    RegExr
    An online tool to learn, build, & test Regular Expressions.

    Regex tester
    An online regex builder/debugger

    Regex interactive tutorial
    An online interactive tutorials, Cheat sheet, & Playground.

    Regex visualizer
    An online visual regex tester.
*/


/*
```

These examples cover both basic and advanced concepts while providing practical, real-world use cases that you can adapt for your own needs. 
They demonstrate various regex features including:
- Capture groups
- Quantifiers
- Character classes
- Assertions
- Boundaries
- Named groups
- String replacement
- Global matching

...
*/