// scripts.js

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  // Only edit below
  // Only edit below

  // Utility function to create an array of a specified length filled with incremental numbers
const createArray = (length) => {
    const result = [];
    
    // Fill the array with incremental numbers starting from 0
    for (let i = 0; i < length; i++) {
      result.push(i);
    }
    
    return result;
  };
  
  // Function to create data for the calendar
  const createData = () => {
    // Get the current date
    const current = new Date();
    current.setDate(1); // Set the date to the first day of the month
    
    // Get the starting day of the month and the number of days in the month
    const startDay = current.getDay();
    const daysInMonth = getDaysInMonth(current);
    
    // Calculate the number of weeks in the month
    const weeks = createArray(Math.ceil((startDay + daysInMonth) / 7));
    const days = createArray(7); // Array representing days of the week (0-6, 0 = Sunday)
    const result = [];
    
    // Iterate through each week
    for (const weekIndex of weeks) {
      result.push({
        week: weekIndex + 1, // Week number
        days: [], // Array to store days of the week
      });
    
      // Iterate through each day of the week
      for (const dayIndex of days) {
        const day = weekIndex * 7 + dayIndex - startDay + 1; // Calculate the day number
        const isValid = day > 0 && day <= daysInMonth; // Check if the day is valid
    
        // Push day data to the result array
        result[weekIndex].days.push({
          dayOfWeek: dayIndex + 1, // Day of the week (1-7, 1 = Sunday)
          value: isValid ? day : "", // Day value (empty string if not valid)
        });
      }
    }
    
    return result; // Return the generated data
  };
  
  // Function to add a table cell to an existing HTML string
  const addCell = (existing, classString, value) => {
    const result = `
        ${existing}
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `;
    
    return result; // Return the updated HTML string
  };
  
  // Function to create HTML content for the calendar
  const createHtml = (data) => {
    let result = ""; // Initialize the result variable
    
    // Iterate through each week of data
    for (const { week, days } of data) {
      let inner = ""; // Initialize the inner HTML for the week
      
      // Add a cell for the week number
      inner = addCell(inner, "table_cell table_cell_sidebar", `Week ${week}`);
    
      // Iterate through each day of the week
      for (const { dayOfWeek, value } of days) {
        // Check if the day is today, a weekend, or part of an alternate week
        const isToday = new Date().getDate() === value;
        const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
        const isAlternate = week % 2 === 0;
        let classString = "table__cell"; // Initialize class string for the cell
    
        // Add appropriate classes based on conditions
        if (isToday) classString += " table__cell_today";
        if (isWeekend) classString += " table__cell_weekend";
        if (isAlternate) classString += " table__cell_alternate";
    
        // Add the cell to the inner HTML
        inner = addCell(inner, classString, value);
      }
    
      // Add the row with cells for the week to the result
      result = `
          ${result}
          <tr>${inner}</tr>
      `;
    }
    
    return result; // Return the generated HTML
  };
  
  // Set the title of the calendar to the current month and year
  const current = new Date();
  document.querySelector("[data-title]").innerText = `${
    MONTHS[current.getMonth()]
  } ${current.getFullYear()}`;
  
  // Generate data for the calendar
  const data = createData();
  
  // Populate the content of the calendar with HTML generated from the data
  document.querySelector("[data-content]").innerHTML = createHtml(data);