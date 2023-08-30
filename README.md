# column-type-detector

A JavaScript library to automatically detect column types in a dataset based on their values.

## Installation

Install the `column-type-detector` package using npm:

```sh
npm install column-type-detector
```

or

```sh
yarn add column-type-detector

```

## Usage

```js
const { autoDetectColumnTypes } = require("column-type-detector");

const csvData = `
    Name, Age, Birthday, Email, Price, Options
    John, 25, 1998-06-15, john@example.com, 99.99, [Option1, Option2]
    Jane, 30, 1992-03-20, jane@example.com, 149.50, [Option2], [x]
`;

const detectedTypes = autoDetectColumnTypes(csvData);
console.log(detectedTypes);
```

## Supported Column Types

The `column-type-detector` package supports the following column types:

- Number (Integer) / Float (Decimal)
- Date / Time / DateTime (Date and Time)
- Boolean (True/False)
- URL (Web address)
- Email
- Image / Audio / Video
- Price (Currency value)
- Percentage
- JSON (JavaScript Object Notation)
- Object (for serialization)
- Enum (Enumerated values)
- ID (Identifier)
- IP Address
- Phone Number
- Gender
- Select (Single Choice) / Multiple Select (Multiple Choices)
- Checkbox (Boolean option) / Radio Button (Single-choice option)
- Dropdown (Select from a list)
- Slider (Numeric range selection)
- Text Area (Long text input)
- Password (Secure text input)
- File Upload
- Color Picker
- Rating (Numeric or star-based)
- Likert Scale (Ordered scale)
- Matrix (Grid of choices)
- Tags (Multiple categorization)
- Autocomplete (Suggestive text input)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
