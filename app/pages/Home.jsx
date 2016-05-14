import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';

import SlideshowContainer from '../containers/SlideshowContainer';
import {FeatureContainer} from '../containers/FeatureContainer';


export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='home'>
              <Helmet
                title='Anna Lancaster Fine Art Tualatin Oregon'
                meta={[
                    {'name': 'description', 'content': 'Anna Lancaster is a fine artist who paints portraits, contemporary, and plein air landscapes as Anna Lancaster Fine Art in Tualatin Oregon.'}
                ]}
              />
              <Grid>
                <Row>
                  <Col xs={12}>
                    <SlideshowContainer />
                  </Col>
                  <Col xs={12} className='mt'>
                    <FeatureContainer />
                  </Col>
                </Row>
              </Grid>
              {this.props.children}
            </div>
        );
    }
});
