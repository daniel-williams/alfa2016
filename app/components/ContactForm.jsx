import React from 'react';
import Formsy from 'formsy-react';
import {Row, Col} from 'react-bootstrap';

import {SkyInput, SkyTextArea} from './';


export default React.createClass({

  render: function() {
    const user = this.props.user;
    const message = this.props.message || '';

    return (
      <Formsy.Form onValidSubmit={this.props.onValidSubmit}>
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
            <SkyTextArea name='message' required value={message} className='form-control' />
          </Col>
          <Col xs={12}>
            <button type='submit' className='btn btn-alfa-default'>Submit</button>
          </Col>
        </Row>
      </Formsy.Form>
    );
  },

});
