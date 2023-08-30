const moment = require("moment");
const Papa = require("papaparse");

export function detectColumnType(value) {
  // Number and Float
  if (!isNaN(value)) {
    if (Number.isInteger(+value)) return "Number (Integer)";
    else return "Float (Decimal)";
  }

  // Date and Time
  if (moment(value, moment.ISO_8601, true).isValid()) {
    if (value.includes("T")) return "DateTime (Date and Time)";
    else if (value.includes(":")) return "Time";
    else return "Date";
  }

  // Boolean
  if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
    return "Boolean (True/False)";
  }

  // URL
  if (/^(http|https):\/\/\S+$/.test(value)) {
    return "URL (Web address)";
  }

  // Email
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Email";
  }

  // Images, Audio, Video
  if (value.startsWith("data:image")) {
    return "Image";
  } else if (value.startsWith("data:audio")) {
    return "Audio";
  } else if (value.startsWith("data:video")) {
    return "Video";
  }

  // Price
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return "Price (Currency value)";
  }

  // Percentage
  if (/\d+\.\d+\%/.test(value)) {
    return "Percentage";
  }

  // JSON and Object
  if (/\[.*\]/.test(value)) {
    return "JSON (JavaScript Object Notation)";
  } else if (/^\{.*\}$/.test(value)) {
    return "Object (for serialization)";
  }

  // Enum
  if (/^[A-Za-z]+$/.test(value)) {
    return "Enum (Enumerated values)";
  }

  // ID
  if (/^\d+$/.test(value)) {
    return "ID (Identifier)";
  }

  // IP Address
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
    return "IP Address";
  }

  // Phone Number
  if (/^\d{10,}$/.test(value)) {
    return "Phone Number";
  }

  // Gender
  if (["male", "female", "other"].includes(value.toLowerCase())) {
    return "Gender";
  }

  // Select and Multiple Select
  if (/^\[.*\]$/.test(value)) {
    return "Select (Single Choice)";
  } else if (/^\[.*\].*$/.test(value)) {
    return "Multiple Select (Multiple Choices)";
  }

  // Checkbox and Radio Button
  if (/^\[x\]$/.test(value)) {
    return "Checkbox (Boolean option)";
  } else if (/^\(x\)$/.test(value)) {
    return "Radio Button (Single-choice option)";
  }

  // Dropdown
  if (/^\{.*\}$/.test(value)) {
    return "Dropdown (Select from a list)";
  }

  // Slider
  if (/^\d+-\d+$/.test(value)) {
    return "Slider (Numeric range selection)";
  }

  // Text Area
  if (value.length > 50) {
    return "Text Area (Long text input)";
  }

  // Password
  if (/^[\x21-\x7E]{8,}$/.test(value)) {
    return "Password (Secure text input)";
  }

  // File Upload
  if (value.toLowerCase() === "file") {
    return "File Upload";
  }

  // Color Picker
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    return "Color Picker";
  }

  // Rating
  if (/^\d+(\.\d+)?$/.test(value) && +value >= 0 && +value <= 5) {
    return "Rating (Numeric or star-based)";
  }

  // Likert Scale
  if (
    /^(Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree)$/.test(value)
  ) {
    return "Likert Scale (Ordered scale)";
  }

  // Matrix
  if (/^(\[.*\])+\{.*\}$/.test(value)) {
    return "Matrix (Grid of choices)";
  }

  // Tags
  if (/^(tag1,tag2,tag3)$/.test(value)) {
    return "Tags (Multiple categorization)";
  }

  // Autocomplete
  if (/^suggest:.+$/.test(value)) {
    return "Autocomplete (Suggestive text input)";
  }

  // Default to String
  return "String (Text)";
}

export function autoDetectColumnTypes(csvData) {
  const parsedData = Papa.parse(csvData, { header: true }).data;
  const columnTypes = {};

  for (const row of parsedData) {
    for (const column in row) {
      if (!columnTypes[column]) {
        columnTypes[column] = new Set();
      }
      columnTypes[column].add(detectColumnType(row[column]));
    }
  }

  return columnTypes;
}
