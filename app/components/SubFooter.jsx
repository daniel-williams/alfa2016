import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';


export default React.createClass({
  render: function() {
    return (
      <div id='sub-footer'>
        <Grid>
          <Row>
            <Col md={2} sm={1} className='hidden-xs'></Col>
            <Col md={8} sm={10} xs={12} style={{textAlign:'center'}} className='mt-half'>
              <h2>Oil paintings of beauty that beckon to be seen &amp; touched.</h2>
            </Col>
            <Col md={2} sm={1} className='hidden-xs'></Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
