// Internationalization:

// The Intl object is the namespace for the ECMAScript Internationalization API, 
// which provides a wide range of locale- and culture-sensitive data 
// and operations.

/**
 * Currently, it provides the following functionalities:

 * **Getting information about a locale using Intl.Locale.
 * **Formatting data using Intl.DateTimeFormat, Intl.DurationFormat, 
 *      Intl.ListFormat, Intl.NumberFormat, and Intl.RelativeTimeFormat.
 * **Collation (i.e., comparing strings for sorting or searching) using 
 *      Intl.Collator.
 * **Selecting plural forms using Intl.PluralRules.
 * **Segmenting text into units such as words, sentences, or graphemes 
 *      using Intl.Segmenter.
 * **Getting the displayed name for currencies, languages, scripts, regions, 
 *      and time zones using Intl.DisplayNames.
 */

// 1. Construct a formatter object, specifying the locale and formatting options:
const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// 2. Use the `format` method of the formatter object to format a number:
console.log(price.format(5.259)); // $5.26

// Locale information:

/**
* A locale is a set of conventions, represented in the Intl API by 
  the Intl.Locale object. 
  All Intl constructors that accept language tags also accept Intl.Locale objects.
*/

// These two are equivalent when passed to other Intl APIs
const locale1 = new Intl.Locale("en-US");
const locale2 = new Intl.Locale("en-Latn-US");

console.log(locale1.language, locale1.script, locale1.region); // "en", undefined, "US"
console.log(locale2.language, locale2.script, locale2.region); // "en", "Latn", "US"

const df1 = new Intl.DateTimeFormat("en-US-u-ca-hebrew");
const df2 = new Intl.DateTimeFormat("en-US", { calendar: "hebrew" });


const locale = new Intl.Locale("en-US");
console.log(locale.calendar); // undefined; it's not provided
console.log(new Intl.DateTimeFormat(locale).resolvedOptions().calendar); // "gregory"


locale = new Intl.Locale("ar-EG");
console.log(locale.getCalendars()); 
// ['gregory', 'coptic', 'islamic', 'islamic-civil', 'islamic-tbla']


// Suppose this can be changed by some site-wide control
const userSettings = {
  locale: "en-US",
  colorMode: "dark",
};
const numberFormatter = new Intl.NumberFormat(userSettings.locale);
console.log(numberFormatter.format(1234567.89));


const numberFormatter1 = new Intl.NumberFormat([
  "yue-Hant",
  "zh-Hant-HK",
  "zh-Hant",
  "zh",
]);


// Formatting data:

/**
 * The Intl.DateTimeFormat, Intl.DurationFormat, Intl.ListFormat, 
 * Intl.NumberFormat, and Intl.RelativeTimeFormat objects 
 * each format one kind of data. Each instance provides two methods:

** format(): Takes a piece of data and returns a string using the formatting rule 
    as determined by the locale and options.

** formatToParts(): Takes the same data and returns the same string, 
    but broken down into parts, each part being an object with a type and a value. 
    This is useful for more advanced use cases, such as interleaving 
    the formatted text with other texts.
 */

// 1. Construct a formatter object, specifying the locale and formatting options:
price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// 2. Use the `format` method of the formatter object to format a number:
console.log(price.format(5.259)); // $5.26

// Or, use the `formatToParts` method to get the formatted number
// broken down into parts:
console.table(price.formatToParts(5.259));
// |   | type       | value |
// | 0 | "currency" | "$"   |
// | 1 | "integer"  | "5"   |
// | 2 | "decimal"  | "."   |
// | 3 | "fraction" | "26"  |




// Date and Time Formatting:
/**
 * Intl.DateTimeFormat formats dates and times, as well as ranges of dates and 
 * times. The DateTimeFormat object takes date/time inputs 
 * in one of the following forms: 
 * Date, Temporal.PlainDateTime, Temporal.PlainTime, 
 * Temporal.PlainDate, Temporal.PlainYearMonth, or Temporal.PlainMonthDay.
 */

/**
 * Note: 
 * 
 * Note: You can't pass a Temporal.ZonedDateTime object directly, 
 *  because the time zone is already fixed in the object. 
 * You should use Temporal.ZonedDateTime.prototype.toLocaleString() 
 *  or convert it to a Temporal.PlainDateTime object first.
 */

// Assume that the local time zone is UTC
const targetDate = new Date(2025, 0, 1); // 2025-01-01 midnight in the local time zone
const results = [];

for (const calendar of ["gregory", "hebrew"]) {
  for (const timeZone of ["America/New_York", "Asia/Tokyo"]) {
    const df = new Intl.DateTimeFormat("en-US", {
      calendar,
      timeZone,
      // More on these later
      dateStyle: "full",
      timeStyle: "full",
    });
    results.push({ calendar, timeZone, output: df.format(targetDate) });
  }
}

console.table(results);


// Number formatting: 
/**
 * Number formatting is done with the Intl.NumberFormat object. 
 * The NumberFormat object accepts inputs in the form of numbers, 
 * strings, or BigInt values.
 * 
 * Passing a string or BigInt instead of a number allows you to format numbers 
 * that are too large or too small to be represented 
 * precisely as a JavaScript number.
 */


results = [];
for (const options of [
  { style: "decimal" }, // Format the number as a dimensionless decimal
  { style: "percent" }, // Format the number as a percentage; it is multiplied by 100
  { style: "currency", currency: "USD" }, // Format the number as a US dollar amount
  { style: "unit", unit: "meter" }, // Format the number as a length in meters
]) {
  const nf = new Intl.NumberFormat("en-US", options);
  results.push({ style: options.style, output: nf.format(1234567.89) });
}
console.table(results);


const heightRange = {
  min: 1.63,
  max: 1.95,
};

const nf = new Intl.NumberFormat("en-US", { style: "unit", unit: "meter" });
console.log(nf.formatRange(heightRange.min, heightRange.max));
// 1.63–1.95 m


// List formatting:

const fruits = ["apple", "banana", "cherry"];
const lf = new Intl.ListFormat("en-US", { style: "long", type: "conjunction" });
console.log(`I like ${lf.format(fruits)}.`);
// I like apple, banana, and cherry.

lf = new Intl.ListFormat("en-US", { style: "long", type: "disjunction" });
console.log(`I can give you ${lf.format(fruits)}.`);
// I can give you apple, banana, or cherry.

// Relative time formatting:

/**
 * Intl.RelativeTimeFormat formats a time difference. 
 * The RelativeTimeFormat object takes relative times in the form of two arguments: 
 * a number (with any sign) and a time unit, such as "day", "hour", or "minute".
 */

const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
console.log(rtf.format(1, "day")); // tomorrow
console.log(rtf.format(2, "day")); // in 2 days
console.log(rtf.format(-1, "hour")); // 1 hour ago




//Duration formatting: 

console.log(
  new Intl.DurationFormat("en-US", {
    style: "long",
  }).format({ hours: 3, minutes: 4, seconds: 5 }),
);
// 3 hours, 4 minutes, and 5 seconds



// Collation:

const names = ["Hochberg", "Hönigswald", "Holzman"];

const germanPhonebook = new Intl.Collator("de-DE-u-co-phonebk");

// as if sorting ["Hochberg", "Hoenigswald", "Holzman"]:
console.log(names.sort(germanPhonebook.compare));
// ['Hochberg', 'Hönigswald', 'Holzman']



const germanDictionary = new Intl.Collator("de-DE-u-co-dict");

// as if sorting ["Hochberg", "Honigswald", "Holzman"]:
console.log(names.sort(germanDictionary.compare).join(", "));
// "Hochberg, Holzman, Hönigswald"

// Plural rules:

// The Intl.PluralRules object is useful for selecting 
// the correct plural form of a word.

function formatMessage(n) {
  return `You have ${n} ${n === 1 ? "apple" : "apples"}.`;
}

const prCard = new Intl.PluralRules("en-US");
const prOrd = new Intl.PluralRules("en-US", { type: "ordinal" });

const englishOrdinalSuffixes = {
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
};

const catPlural = {
  one: "cat",
  other: "cats",
};

function formatMessage(n1, n2) {
  return `The ${n1}${englishOrdinalSuffixes[prOrd.select(n1)]} U.S. president had ${n2} ${catPlural[prCard.select(n2)]}.`;
}

console.log(formatMessage(42, 1)); // The 42nd U.S. president had 1 cat.
console.log(formatMessage(45, 0)); // The 45th U.S. president had 0 cats.


// --- Simple Message Translation Example ---
function greet(name, locale = 'en') {
  const messages = {
    en: `Hello, ${name}!`,
    fr: `Bonjour, ${name} !`,
    de: `Hallo, ${name}!`,
    hi: `नमस्ते, ${name}!`
  };
  return messages[locale] || messages['en'];
}
console.log(greet('Alice', 'en'));
console.log(greet('Alice', 'fr'));
console.log(greet('Alice', 'hi'));

// --- Intl.DisplayNames Example ---
// Display language and region names in different locales
const langDisplay = new Intl.DisplayNames(['en'], { type: 'language' });
const regionDisplay = new Intl.DisplayNames(['en'], { type: 'region' });
console.log('Language (fr):', langDisplay.of('fr'));
console.log('Language (hi):', langDisplay.of('hi'));
console.log('Region (DE):', regionDisplay.of('DE'));
console.log('Region (IN):', regionDisplay.of('IN'));



// --- Advanced: ICU Message Formatting (with parameterized messages) ---
// Node.js does not yet support Intl.MessageFormat natively. Use the 'intl-messageformat' package for ICU-style formatting.
// To try this example, run:
//   npm install intl-messageformat
// Then run this file with Node.js.

try {
  const { default: MessageFormat } = require('intl-messageformat');

  // Example: parameterized greeting with plural and select
  const msg = new MessageFormat(
    '{gender, select, male {Mr.} female {Ms.} other {Mx.}} {lastName}, you have {numCats, plural, =0 {no cats} one {one cat} other {# cats}}.',
    'en'
  );
  console.log(msg.format({ gender: 'male', lastName: 'Smith', numCats: 0 })); // Mr. Smith, you have no cats.
  console.log(msg.format({ gender: 'female', lastName: 'Doe', numCats: 1 })); // Ms. Doe, you have one cat.
  console.log(msg.format({ gender: 'other', lastName: 'Lee', numCats: 3 })); // Mx. Lee, you have 3 cats.

  // Example: date and number formatting in ICU
  const invoiceMsg = new MessageFormat(
    'Invoice total: {total, number, ::currency/USD} (due {due, date, long})',
    'en-US'
  );
  console.log(invoiceMsg.format({ total: 1234.56, due: new Date('2025-12-01') }));
} catch (e) {
  console.log('To run ICU message formatting examples, install intl-messageformat: npm install intl-messageformat');
}