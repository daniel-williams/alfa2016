import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';

import {ImageLoader} from '../components'

export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='contact'>
              <Grid>
                <Row>
                  <Col sm={6} xs={12}>
                    <h3>Get in Touch with the Artist</h3>
                    <p>If you'd like to chat about Anna Lancaster’s Fine Art, purchase a piece, or simply get in touch with the Artist, please send a message using the form below. Anna looks forward to hearing from you!</p>
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
