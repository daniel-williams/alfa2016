import React from 'react';
// import Bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Bootstrap from '../../Web/content/styles/bootstrap.min.css';

import Header from './Header';
import Footer from './Footer';
import SubFooter from './SubFooter';
import Copyright from './Copyright';
require('./App.less');
require('../fonts');


export default React.createClass({
  render: function() {
    return (
      <div id='main-wrap'>
        <Header {...this.props} />
        <div id='page-wrap'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  },

});
