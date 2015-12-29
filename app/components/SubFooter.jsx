import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';


export default React.createClass({
  render: function() {
    return (
      <div id='sub-footer'>
        <Grid>
          <Row>
            <Col sm={2}></Col>
            <Col sm={8} xs={12} style={{textAlign:'center'}}>
              <h2>Oil paintings of beauty that beckon to be seen &amp; touched.</h2>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
