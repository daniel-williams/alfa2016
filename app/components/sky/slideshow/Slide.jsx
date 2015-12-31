import React from 'react';

import {ImageLoader} from '../../sky';

export default React.createClass({
  render: function() {
    return (
      <div className='slide'>
        <ImageLoader src={'/content/images/slideshow/' + this.props.src} className='img-resposive' />
        <div>{this.props.title}</div>
      </div>
    );
  }
})
