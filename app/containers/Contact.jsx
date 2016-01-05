import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import {Modal, Grid, Row, Col} from 'react-bootstrap';

import * as actionCreators from '../actions/contactActionCreators';


export const Contact = React.createClass({
  // mixins: [PureRenderMixin],

  // componentWillUnmount: function() {
  //   if(this.refs.modal) {
  //     this.refs.modal._onHide();
  //   }
  // },
  getInitialState: function() {
    return {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  },
  componentWillMount: function() {
    console.log('CONTACT PROPS', this.props);
    let contact = this.props.contact.toJS();
    console.log('WillMount', contact);
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.phone,
    });
  },
  componentWillReceiveProps: function(nextProps) {
    console.log('willReceive', nextProps.contact.toJS());
  },
  showModal: function() {
    return this.props.contact.get('contactActive');
  },
  isPosting: function() {
    return this.props.contact.get('isPosting');
  },
  render: function() {
    return (
      <Modal id='contact-modal' ref='modal' show={this.showModal()} backdrop='static'>
        <Modal.Body className='linen'>
          {this.isPosting() && <div className='working' />}
          <form onSubmit={this.handleSubmit} >
          <Row>
            <Col xs={12} className='mb'>
              <h3>Contact Anna Lancaster</h3>
              <i className='icon-alfa-close' onClick={this.handleClose} style={{position:'absolute',right:'15px',top:0}} />
            </Col>
            <Col xs={12}>
              <input type='text' defaultValue={this.state.name} onChange={this.nameChange} className='form-control' placeholder='Name' />
            </Col>
            <Col sm={6} xs={12}>
              <input type='text' defaultValue={this.state.email} onChange={this.emailChange} className='form-control' placeholder='Email Address' />
            </Col>
            <Col sm={6} xs={12}>
              <input type='text' defaultValue={this.state.phone} onChange={this.phoneChange} className='form-control' placeholder='Phone Number' />
            </Col>
            <Col xs={12}>
              <textarea defaultValue={this.state.message} onChange={this.messageChange} className='form-control' placeholder='Message' />
            </Col>
            <Col xs={12}>
              <button type='submit' className='btn btn-alfa-default'>Submit</button>
            </Col>
          </Row>
          </form>
        </Modal.Body>
      </Modal>
    );
  },
  // render: function() {
  //   return (
  //       <Grid className='linen'>
  //         {this.isPosting() && <div className='working' />}
  //         <form onSubmit={this.handleSubmit} >
  //         <Row>
  //           <Col xs={12} className='mb'>
  //             <h3>Contact Anna Lancaster</h3>
  //             <a onClick={this.handleClose} style={{position:'absolute',right:'15px',top:0}}><i className='icon-alfa-close' /></a>
  //           </Col>
  //           <Col xs={12}>
  //             <input type='text' defaultValue={this.state.name} onChange={this.nameChange} className='form-control' placeholder='Name' />
  //           </Col>
  //           <Col sm={6} xs={12}>
  //             <input type='text' defaultValue={this.state.email} onChange={this.emailChange} className='form-control' placeholder='Email Address' />
  //           </Col>
  //           <Col sm={6} xs={12}>
  //             <input type='text' defaultValue={this.state.phone} onChange={this.phoneChange} className='form-control' placeholder='Phone Number' />
  //           </Col>
  //           <Col xs={12}>
  //             <textarea defaultValue={this.state.message} onChange={this.messageChange} className='form-control' placeholder='Message' />
  //           </Col>
  //           <Col xs={12}>
  //             <button type='submit' className='btn btn-alfa-default'>Submit</button>
  //           </Col>
  //         </Row>
  //         </form>
  //     </Grid>
  //   );
  // },

  nameChange: function(event) {
    this.setState({
      name: event.target.value
    });
  },
  emailChange: function(event) {
    this.setState({
      email: event.target.value
    });
  },
  phoneChange: function(event) {
    this.setState({
      phone: event.target.value
    });
  },
  messageChange: function(event) {
    this.setState({
      message: event.target.value
    });
  },
  handleClose: function(e) {
    e.preventDefault();
    this.props.hideContact();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Submit:', this.state);
    this.props.submitContact(this.state);
  },

});

function mapStateToProps(state) {
  return {
    contact: state.get('contact')
  };
}

export const ContactContainer = connect(mapStateToProps, actionCreators)(Contact);
