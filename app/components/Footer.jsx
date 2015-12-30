import React from 'react';

import Contact from './Contact';
import SubFooter from './SubFooter';
import Copyright from './Copyright';
require('./Footer.less');


export default React.createClass({
  render: function() {
    return (
      <div id='footer'>
        <Contact />
        <SubFooter/>
        <Copyright />
      </div>
    );
  },

});
