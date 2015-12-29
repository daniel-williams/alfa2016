import React from 'react';

import Brand from './Brand';
import Nav from './Nav';
require('./Header.less');


export default React.createClass({
  render: function() {
    return (
      <div id='header'>
        <Brand />
        <div className='nav-before'/>
        <Nav {...this.props}/>
        <div className='nav-after'/>
      </div>
    );
  },


});
