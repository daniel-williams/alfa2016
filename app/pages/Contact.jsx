import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';

import {ImageLoader} from '../components'


export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='contact'>
              <Helmet
                title='Contact Anna Lancaster Fine Art'
                meta={[{
                  'name': 'description',
                  'content': 'Contact Anna Lancaster Fine Art or contact Anna Lancaster Tualatin Oregon artist for more information about her oil paintings.'
                }]}
              />
              <Grid>
                <Row>
                  <Col sm={6} xs={12}>
                    <h3>Get in Touch with Anna</h3>
                    <p>If you'd like to chat about Anna Lancaster Fine Art, purchase a piece, or simply get in touch, I'd love to hear from you. Please refer to my social links and contact information below, or send me a direct message using the contact form. Thank you for your interest in Anna Lancaster Fine Art!</p>
                  </Col>
                  <Col sm={6} className='hidden-xs'>
                    <ImageLoader src='/content/images/anna-lancaster-cathedral-park-plein-air-painting.jpg' className='img-responsive' style={{maxHeight:'200px'}} />
                  </Col>
                </Row>
              </Grid>
              {this.props.children}
            </div>
        );
    }
});
