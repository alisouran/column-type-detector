"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoDetectColumnTypes = autoDetectColumnTypes;
exports.detectColumnType = detectColumnType;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var moment = require("moment");
var Papa = require("papaparse");
function detectColumnType(value) {
  // Number and Float
  if (!isNaN(value)) {
    if (Number.isInteger(+value)) return "Number (Integer)";else return "Float (Decimal)";
  }

  // Date and Time
  if (moment(value, moment.ISO_8601, true).isValid()) {
    if (value.includes("T")) return "DateTime (Date and Time)";else if (value.includes(":")) return "Time";else return "Date";
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
  if (/^(Strongly Agree|Agree|Neutral|Disagree|Strongly Disagree)$/.test(value)) {
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
function autoDetectColumnTypes(csvData) {
  var parsedData = Papa.parse(csvData, {
    header: true
  }).data;
  var columnTypes = {};
  var _iterator = _createForOfIteratorHelper(parsedData),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;
      for (var column in row) {
        if (!columnTypes[column]) {
          columnTypes[column] = new Set();
        }
        columnTypes[column].add(detectColumnType(row[column]));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return columnTypes;
}