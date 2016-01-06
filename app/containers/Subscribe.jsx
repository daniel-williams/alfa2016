import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import {Modal, Grid, Row, Col} from 'react-bootstrap';
import Formsy from 'formsy-react';

import * as subscribeActions from '../actions/subscribeActionCreators';
import {SkyInput} from '../components';

export const Subscribe = React.createClass({
  getInitialState: function() {
    return {
      email: '',
    };
  },
  componentWillMount: function() {
    let subscribe = this.props.subscribe.toJS();
    this.setState({
      email: subscribe.email,
    });
  },
  // componentWillReceiveProps: function(nextProps) {
  //   console.log('willReceive', nextProps.subscribe.toJS());
  // },
  showModal: function() {
    return this.props.subscribe.get('isActive');
  },
  isPosting: function() {
    return this.props.subscribe.get('isPosting');
  },
  hasResponded: function() {
    return this.props.subscribe.get('hasResponded');
  },
  render: function() {
    var btnState = this.isPosting() ? 'disabled' : '';
    return (
      <Modal id='subscribe-modal' ref='modal' show={this.showModal()} backdrop='static'>
        <Modal.Header>
          <Row>
            <Col xs={12}>
              <h3 className='mr-dbl'>Get the latest, directly to your inbox</h3>
              <a onClick={this.handleClose} style={{position:'absolute',right:'15px',top:0}}><i className='icon-alfa-close' /></a>
            </Col>
            <Col xs={12}>
              <p>Receive exhibit announcements, artist reception invitations and learn about what's new at Anna Lancater Fine Art.</p>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          {this.hasResponded() ? this.renderSuccess()
                               : this.renderForm()}
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col xs={12}>
              <p style={{fontStyle:'italic',textAlign:'left'}}>Anna Lancaster Fine Art will never share your personal information with 3rd parties.</p>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );
  },
  renderForm: function() {
    return (
      <Formsy.Form onValidSubmit={this.props.submitSubscribe}>
        <Row>
          <Col xs={12} className='mb'>
            <SkyInput name="email" required validations="isEmail" validationError="A valid email address is required." placeholder='Email Address' className='form-control' />
          </Col>
          <Col xs={12}>
            <button type='submit' className='btn btn-alfa-default mr' btnState>Subscribe Now</button>
            <button type='button' className='btn btn-alfa-primary' onClick={this.handleClose} btnState>Maybe Later</button>
          </Col>
        </Row>
      </Formsy.Form>
    );
  },
  renderSuccess: function() {
    let email = this.props.subscribe.get('userEmail');
    return (
      <Row>
        <Col xs={12} className='mb'>
          <h4>Hooray!</h4>
          <p>You will occasionally receive news and announcements at <span style={{fontWeight:'bold'}}>{email}</span>. Thank you for your interest in Anna Lancaster Fine Art.</p>
        </Col>
        <Col xs={12}>
          <button type='button' className='btn btn-alfa-default' onClick={this.handleClose}>Close</button>
        </Col>
      </Row>
    );
  },


  handleClose: function(e) {
    e.preventDefault();
    subscribeActions.hideSubscribe();
  },

});

function mapStateToProps(state) {
  return {
    subscribe: state.get('subscribe')
  };
}

export const SubscribeContainer = connect(mapStateToProps, subscribeActions)(Subscribe);
