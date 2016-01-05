import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';

import {Icon} from '../../components';

export default React.createClass({
  render: function() {
    return (
      <div id='contact' className='linen'>
        <Grid className='pt'>
          <Row>
            <Col sm={6} xs={12} className='mb'>
              <h3>Send a Message</h3>
              <Row>
                <Col xs={12}>
                  <input type='text' className='form-control' name='name' placeholder='Name' />
                </Col>
                <Col sm={6} xs={12}>
                  <input type='text' className='form-control' name='address' placeholder='Email Address' />
                </Col>
                <Col sm={6} xs={12}>
                  <input type='text' className='form-control' name='phone' placeholder='Phone Number' />
                </Col>
                <Col xs={12}>
                  <textarea className='form-control' name='message' placeholder='Message`' />
                </Col>
                <Col xs={12}>
                  <button type='button' className='btn btn-alfa-default' onClick={this.handleSubmit}>Submit</button>
                </Col>
              </Row>
            </Col>
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

  handleSubmit: function() {
    alert('TODO: submit form');
  },

});
