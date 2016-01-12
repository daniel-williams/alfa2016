import React from 'react'
import {Row, Col} from 'react-bootstrap';
import Formsy from 'formsy-react';

import {SkyInput, SkyTextArea, ContactForm} from '../components';

import * as actions from '../actions/inquiryActionCreators';


export default React.createClass({
  getStep: function() {
    return this.props.inquiry.get('Step');
  },
  getMessage: function() {
    return `Hi Anna, I'm browsing your website and would like additional information about ${this.props.item.title}.`
  },
  render: function() {
    return (
      <Row className='inquiry'>
        <Col xs={12} className='mb'>
          {this.renderStep()}
        </Col>
      </Row>
    )
  },
  renderStep: function() {
    switch(this.props.inquiry.get('Step')) {
      case 'Intro':
        return this.renderIntro();
      case 'Form':
      case 'Failure':
        return this.renderForm();
      case 'Success':
        return this.renderSuccess();
      default:
        return null;
    }
  },
  renderIntro: function() {
    return (
      <a onClick={actions.showInquiry}>Available for purchase.</a>
    );
  },
  renderForm: function() {
    return(
      <ContactForm message={this.getMessage()} user={this.props.user.toJS()} art={this.props.item.title} onValidSubmit={this.props.submitInquiry} />
    );
  },
  renderSuccess: function() {
    const user = this.props.user.toJS();
    return (
      <div>
        <h4>Thank you!</h4>
        <p>We have received your inquiry and will respond to you at <span className='bold'>{user.email}</span>. Thank you for your interest in Anna Lancaster Fine Art.</p>
      </div>
    );
  },

});
