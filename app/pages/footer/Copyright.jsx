import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';

import {Icon} from '../../components';

export default React.createClass({
  render: function() {
    return (
      <div id='copyright'>
        <Grid>
          <Row className='mb-half'>
            <Col xs={12} style={{textAlign:'center'}}>
              Copyright <span>&#169;</span> {new Date().getFullYear()}. All rights reserved. Anna Lancaster Fine Art. PO Box 489. Tualatin Oregon 97062-0489.
            </Col>
            <Col xs={12} style={{textAlign:'center'}}>
              <span className='credits'>With <Icon name='heart-outline' /> by <a href='http://skyberrystudio.com'>Skyberry</a></span>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
