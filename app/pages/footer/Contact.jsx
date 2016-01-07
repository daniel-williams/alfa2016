import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import Formsy from 'formsy-react';

import {Icon, SkyInput, SkyTextArea} from '../../components';

import * as contactActions from '../../actions/contactActionCreators';


export default React.createClass({
  isActive: function() {
    return this.props.contact.get('isActive');
  },
  render: function() {
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
              <div className='social-icons'>
                <a href='https://www.facebook.com/AnnaLancasterFineArt' target='_blank' className='icon'><Icon name='facebook' /></a>
                <a href='https://twitter.com/AnnaLancasterFA' target='_blank' className='icon'><Icon name='twitter' /></a>
                <a href='javascript:alert("TODO: need pinterest link")' className='icon'><Icon name='pinterest' /></a>
                <a href='https://www.linkedin.com/in/annalancaster' target='_blank' className='icon'><Icon name='linkedin' /></a>
                <a href='javascript:alert("TODO: need instagram link")' className='icon'><Icon name='instagram' /></a>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  },

  renderForm: function() {
    let user = this.props.user.toJS();
    return (
      <Formsy.Form onValidSubmit={this.validSubmit}>
        <Col sm={6} xs={12} className='mb'>
          <h3>Send a Message</h3>
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
    let user = this.props.user.toJS();
    return (
      <Col sm={6} xs={12} className='mb'>
        <h4>Thank you!</h4>
        <p>We have received your message. For inquiries, we will respond to you at <span style={{fontWeight:'bold'}}>{user.email}</span>. Thank you for your interest in Anna Lancaster Fine Art.</p>
        <a onClick={contactActions.resetContact}>Have more to say?</a>
      </Col>
    );
  },
  validSubmit: function(frmData) {
    this.props.submitContact(frmData);
  },

});
