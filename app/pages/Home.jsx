import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';

import Slideshow from '../containers/Slideshow';
import {FeatureContainer} from '../containers/Feature';


export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='home'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <Slideshow />
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
