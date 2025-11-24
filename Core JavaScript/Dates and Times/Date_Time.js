// Date Object:

// The Date object is used to work with dates and times in JavaScript. It provides various methods to create, manipulate, and format dates.

// Creating a Date Object:
let currentDate = new Date(); // Current date and time
let specificDate = new Date('2023-01-01'); // Specific date
let specificDateTime = new Date('2023-01-01T10:30:00'); // Specific date and time

// Getting Date and Time Components:
let year = currentDate.getFullYear(); // Get the year
let month = currentDate.getMonth(); // Get the month (0-11)
let day = currentDate.getDate(); // Get the day of the month
let hours = currentDate.getHours(); // Get the hours
let minutes = currentDate.getMinutes(); // Get the minutes
let seconds = currentDate.getSeconds(); // Get the seconds  

// Setting Date and Time Components:
currentDate.setFullYear(2024); // Set the year
currentDate.setMonth(11);   // Set the month (0-11) 
currentDate.setDate(25);    // Set the day of the month
currentDate.setHours(15); // Set the hours
currentDate.setMinutes(45); // Set the minutes
currentDate.setSeconds(30); // Set the seconds

// Formatting Dates:
let dateString = currentDate.toDateString(); // Convert to a readable date string
let timeString = currentDate.toTimeString(); // Convert to a readable time string
let isoString = currentDate.toISOString(); // Convert to ISO format string

// Example Usage:
console.log("Current Date and Time:", currentDate);
console.log("Year:", year);
console.log("Month:", month + 1); // Adding 1 to month for human-readable format
console.log("Day:", day);
console.log("Formatted Date String:", dateString);
console.log("Formatted Time String:", timeString);
console.log("ISO String:", isoString);

// Note: Months are zero-indexed (0 = January, 11 = December)

// This code demonstrates how to create and manipulate Date objects in JavaScript.

// The parse method is useful for assigning values from date strings to existing Date objects

const ipoDate = new Date();
ipoDate.setTime(Date.parse("Aug 23, 2025 09:00:00"));


// Example of a simple JavaScript clock function

function JSClock() {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  let temp = String(hour % 12);
  if (temp === "0") {
    temp = "12";
  }
  temp += (minute < 10 ? ":0" : ":") + minute;
  temp += (second < 10 ? ":0" : ":") + second;
  temp += hour >= 12 ? " P.M." : " A.M.";
  return temp;
}
console.log("Current Time:", JSClock());