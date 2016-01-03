import React from 'react';
import {IndexLink} from 'react-router';

import {ImageLoader} from '../components';
require('./Brand.less');

export default React.createClass({
  render: function() {
    return (
      <div id='brand'>
        <IndexLink to="/">
          <h1>
            <ImageLoader src='/content/images/anna-lancaster-fine-art-logo.png' className='img-responsive'/>
          </h1>
        </IndexLink>
      </div>
    );
  }
});
