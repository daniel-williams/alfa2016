import React from 'react';
import Bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Header from './Header';
import Footer from './Footer';
require('./App.less');


export default React.createClass({
  render: function() {
    return (
      <div id='main-wrap'>
        <Header />
        <div id='page-wrap'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  },

});

// import {Modal} from 'react-bootstrap';

// <div className='container'>
//     <div className='col-xs-4'>
//         <button className='btn btn-primary' onClick={this.handleClick}>react-bootstrap? <i className='glyphicon glyphicon-cog'/></button>
//     </div>
// </div>

// <Modal  id='test-modal' ref='modal' show={this.state.showModal} onHide={this.close} dialogClassName='sky-modal' backdrop='static'>
//     <Modal.Header>
//         <Modal.Title>Modal Title</Modal.Title>
//     </Modal.Header>
//
//     <Modal.Body>
//         React Bootstrap reporting for duty!
//     </Modal.Body>
//
//     <Modal.Footer>
//         <button className='btn btn-default' onClick={this.handleClick}>close</button>
//     </Modal.Footer>
//
// </Modal>

// handleClick: function(e) {
//     e.preventDefault();
//     this.setState({
//         showModal: !this.state.showModal
//     });
// }
