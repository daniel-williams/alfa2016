import React from 'react';
import {toJS} from 'immutable';
import {Modal, Grid, Row, Col} from 'react-bootstrap';
import Formsy from 'formsy-react';

import * as actions from '../actions/subscribeActionCreators';
import {Icon, SkyInput} from '../components';

export default React.createClass({
  isActive: function() {
    return this.props.subscribe.get('isActive');
  },
  showSubscribe: function() {
    return this.props.subscribe.get('showSubscribe');
  },
  getButtonState: function() {
    return this.props.subscribe.get('isPosting') ? 'disabled' : '';
  },
  render: function() {
    return (
      <Modal id='subscribe-modal' ref='modal' show={this.showSubscribe()} backdrop='static'>
        <Modal.Header>
          <Row>
            <Col xs={12}>
              <h3 className='modal-ttl'>Get the latest, directly to your inbox</h3>
              <a onClick={this.handleClose} className='modal-close-icon icon'><Icon name='close' /></a>
            </Col>
            <Col xs={12}>
              <p>Receive exhibit announcements, artist reception invitations and learn about what's new at Anna Lancater Fine Art.</p>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          {this.isActive() ? this.renderForm()
                           : this.renderSuccess()}
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
    let btnState = this.getButtonState();
    let user = this.props.user.toJS();
    return (
      <Formsy.Form onValidSubmit={this.props.submitSubscribe}>
        <Row>
          <Col xs={12} className='mb'>
            <SkyInput name="email"
              value={user.email}
              required
              validations="isEmail"
              validationError="A valid email address is required."
              placeholder='Email Address'
              className='form-control' />
          </Col>
        </Row>
        <Row>
          <div className='col mb-half'>
            <button type='submit' className='btn btn-alfa-default' disabled={btnState}>Subscribe Now</button>
          </div>
          <div className='col mb-half'>
            <button type='button' className='btn btn-alfa-primary' onClick={this.handleClose} disabled={btnState}>Maybe Later</button>
          </div>
        </Row>
      </Formsy.Form>
    );
  },
  renderSuccess: function() {
    let user = this.props.user.toJS();
    return (
      <Row>
        <Col xs={12} className='mb'>
          <h4>Hooray!</h4>
          <p>You will occasionally receive news and announcements at <span style={{fontWeight:'bold'}}>{user.email}</span>. Thank you for your interest in Anna Lancaster Fine Art.</p>
        </Col>
        <Col xs={12}>
          <button type='button' className='btn btn-alfa-default' onClick={this.handleClose}>Close</button>
        </Col>
      </Row>
    );
  },

  handleClose: function(e) {
    e.preventDefault();
    actions.hideSubscribe();
  },

});
