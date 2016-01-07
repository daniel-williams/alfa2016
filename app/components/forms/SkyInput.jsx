import React from 'react';
import Formsy from 'formsy-react';


export default React.createClass({
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.showError() ? <span>{this.getErrorMessage()}</span> : null;

    return (
      <div className={className}>
        <input
          {...this.props}
          type="text"
          value={this.getValue()}
          onChange={this.changeValue} />
        {errorMessage}
      </div>
    );
  }
});
