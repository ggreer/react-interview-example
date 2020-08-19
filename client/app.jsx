/* global React: false, ReactDOM: false */

/*
Instructions: Build a react application that contains a form. The form should contain one input and one submit button.
When the submit is clicked:
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
 */

class ExampleForm extends React.Component {
  render () {
    return <div>
      <h1>{this.props.title}</h1>
    </div>
  }
}

ReactDOM.render(<ExampleForm title="Test title" />, document.getElementById("root"));
