import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import Formsy from 'formsy-react';

import {Icon, SkyInput, SkyTextArea} from '../../components';
import * as contactActions from '../../actions/contactActionCreators';


export default React.createClass({
  isActive: function() {
    var contact = this.props.contact.toJS();
    console.log('CONTACT', contact);
    return this.props.contact.get('isActive');
  },
  componentWillReceiveProps: function(nextProps) {
    console.log('willReceive', nextProps.contact.toJS());
  },
  render: function() {
    console.log('render', this.props.contact.toJS());
    return (
      <div id='contact-form' className='linen'>
        <Grid className='pt'>
          <Row>
            {this.isActive() ? this.renderForm()
                             : this.renderSuccess()}
            <Col sm={6} xs={12} className='mb'>
              <h3>Contact Anna</h3>
              <p>Anna Lancaster is a Tualatin Oregon artist. Contact her today or connect on social media to see news about her latest fine art, gallery events, and more.</p>
              <div><span className='inline-lbl'>Phone:</span><span>(503) 784-0149</span></div>
              <div><span className='inline-lbl'>Fax:</span><span>(503) 612-8447</span></div>
              <div style={{margin:'10px 0'}}>
                <a href='mailto:info@AnnaLancasterFineArt.com'>info@AnnaLancasterFineArt.com</a>
              </div>
              <div className='controls'>
                <a href='#'><Icon name='facebook' /></a>
                <a href='#'><i className='icon-alfa-twitter' /></a>
                <a href='#'><i className='icon-alfa-pinterest' /></a>
                <a href='#'><i className='icon-alfa-linkedin' /></a>
                <a href='#'><i className='icon-alfa-instagram' /></a>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  },

  renderForm: function() {
    let contact = this.props.contact.toJS();
    return (
      <Formsy.Form onValidSubmit={this.props.submitContact}>
        <Col sm={6} xs={12} className='mb'>
          <h3>Send a Message</h3>
          <Row>
            <Col xs={12} className='mb-half'>
              <SkyInput defaultValue={contact.userName} name="name" placeholder='Name' className='form-control' />
            </Col>
            <Col sm={6} xs={12} className='mb-half'>
              <SkyInput defaultValue={contact.userEmail} name="email" required validations="isEmail" validationError="A valid email address is required." placeholder='Email Address' className='form-control' />
            </Col>
            <Col sm={6} xs={12} className='mb-half'>
              <SkyInput defaultValue={contact.userPhone} name="phone" placeholder='Phone Number' className='form-control' />
            </Col>
            <Col xs={12} className='mb'>
              <SkyTextArea name="message" required placeholder='Message' className='form-control' />
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
    let contact = this.props.contact.toJS();
    return (
      <Col sm={6} xs={12} className='mb'>
        <h4>Thank you for you inquiry!</h4>
        <p>We have received your message and will respond to <span style={{fontWeight:'bold'}}>{contact.email}</span> as appropriate. Thank you for your interest in Anna Lancaster Fine Art.</p>
        <a onClick={contactActions.resetContact}>Have more to say?</a>
      </Col>
    );
  },

});
