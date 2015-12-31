import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className='controls'>
        <i className='icon-alfa-arrow-left' onClick={this.props.prevSlide} />
        <i className='icon-alfa-arrow-right' onClick={this.props.nextSlide} />
      </div>
    );
  }
})
