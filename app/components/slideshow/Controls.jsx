import React from 'react';

import {Icon} from '../';

export default React.createClass({
  render: function() {
    return (
      <div className='controls'>
        <Icon name='arrow-left' onClick={this.props.prevSlide} />
        <Icon name='arrow-right' onClick={this.props.nextSlide} />
      </div>
    );
  }
})
