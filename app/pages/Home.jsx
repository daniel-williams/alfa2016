import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';

import {Player} from '../components';
import {FeatureContainer} from '../containers/Feature';
require('./Home.less');


export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='home'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <Player />
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
