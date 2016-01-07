import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import Formsy from 'formsy-react';

import {SkyInput, SkyTextArea, ContactForm} from '../components';

import * as actions from '../actions/inquiryActionCreators';


export default React.createClass({
  isActive: function() {
    return this.props.inquiry.get('isActive');
  },
  render: function() {
    let msg = `Hi Anna, I'm browsing your website and would like additional information about ${item}.`
    return (
      <div id='art-inquiry-form'>
        <Row>
          {this.isActive() ? this.renderForm()
                           : this.renderSuccess()}
        </Row>
      </div>
    )
  },

  renderForm: function() {
    let user = this.props.user.toJS();
    let item = this.props.item;
    return (
      <Formsy.Form onValidSubmit={this.validSubmit}>
        <Col xs={12} className='mb'>
          <Row>
            <Col xs={12} className='mb-half'>
              <SkyInput value={user.name} name="name" placeholder='Name' className='form-control' />
            </Col>
            <Col sm={6} xs={12} className='mb-half'>
              <SkyInput value={user.email} name="email" required validations="isEmail" validationError="A valid email address is required." placeholder='Email Address' className='form-control' />
            </Col>
            <Col sm={6} xs={12} className='mb-half'>
              <SkyInput value={user.phone} name="phone" placeholder='Phone Number' className='form-control' />
            </Col>
            <Col xs={12} className='mb'>
              <SkyTextArea name='message' required value={`Hi Anna, I'm browsing your website and would like additional information about ${item}.`} className='form-control' style={{height:'auto'}} />
            </Col>
            <Col xs={12}>
              <button type='submit' className='btn btn-alfa-default'>Submit</button>
            </Col>
          </Row>
        </Col>
      </Formsy.Form>
    );
  },
  renderSuccess: function() {
    let user = this.props.user.toJS();
    return (
      <Col xs={12} className='mb'>
        <h4>Thank you!</h4>
        <p>We have received your inquiry and will respond to you at <span style={{fontWeight:'bold'}}>{user.email}</span>. Thank you for your interest in Anna Lancaster Fine Art.</p>
      </Col>
    );
  },
  validSubmit: function(frmData) {
    console.log('validSubmit', frmData);
    this.props.submitInquiry(frmData);
  },

});
