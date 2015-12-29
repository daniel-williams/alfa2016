import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';


export default React.createClass({
  render: function() {
    return (
      <div id='copyright-wrap'>
        <Grid>
          <Row >
            <Col xs={12}>
              <div style={{textAlign:'center'}}>
                &copy; Copyright {new Date().getFullYear()}. All rights reserved. Anna Lancaster Fine Art. PO Box 3110. Tualatin Oregon 97062.
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
