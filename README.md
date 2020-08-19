# React Interview Example

## Setup

Dependencies: [Node.js](https://nodejs.org/) v10.x or higher. A web browser. A text editor.

To start the server, run `node app.js`. You should then be able to visit http://localhost:3000/ in your browser.

Open `client/app.jsx` with your favorite text editor. If you change anything in app.jsx, save the file and refresh your browser. The changes should be reflected in the browser.


## Instructions

In `client/app.jsx`, build a React application that contains a form. The form should contain one input and one submit button. When the submit is clicked:

- Convert the value in the input to a number.
- Send a POST to /setAmount containing the number. The body should be JSON in the following format:
    {
      "amount": 1.93
    }
- Depending on the value of amount, the backend will respond with either a 200 OK or a 400 bad request.
  - If the status is 200 OK, the response will be JSON of the following form:
    {
      "amount": 1.93
    }
  - If the status is 400 bad request, the response will be JSON containing an error message:
    {
      "error": "Amount must be a number."
    }

Extra credit:
  - On success (HTTP status 2xx), show a success message.
  - On failure (eg: user inputs an invalid number), show the error message returned from the backend.
  - Show a loading indicator while the form is submitting.
  - Disable the submit button while the request is in flight.
