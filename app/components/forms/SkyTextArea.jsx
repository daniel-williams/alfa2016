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
    this.setValue(event.currentTarget.value);
  },
  componentDidMount: function() {
    this.autoGrow(this.refs.el);
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
        <textarea {...this.props} onChange={this.changeValue} onkeyup='autoGrow(this)' ref='el'></textarea>
        {errorMessage}
      </div>
    );
  },
  autoGrow(el) {
    el.style.height = '5px';
    el.style.height = (el.scrollHeight + 20) + 'px';
  },
});
