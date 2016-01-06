import React from 'react';
import Formsy from 'formsy-react';


export default React.createClass({
  mixins: [Formsy.Mixin],

  getInitialState: function(){
    return {
      hideErrors: true
    };
  },
  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    let val = event.currentTarget.value;
    this.setState({
      hideErrors: false
    }, () => this.setValue(val));
  },
  hideErrors: function() {
    this.setState({
      hideErrors: true
    });
  },
  render: function () {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.state.hideErrors ? null : this.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.state.hideErrors ? null : <span>{this.getErrorMessage()}</span>;

    return (
      <div className={className}>
        <input type="text" onChange={this.hideErrors} onBlur={this.changeValue} {...this.props} />
        {errorMessage}
      </div>
    );
  }
});
