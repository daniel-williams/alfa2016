import React from 'react';


export default React.createClass({
  render: function() {
    let cssNames = this.props.active === true ? 'active' : 'off';
    return (
      <div className={'slide ' + cssNames}>
        {this.props.children}
      </div>
    );
  }
})
