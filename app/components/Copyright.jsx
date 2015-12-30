import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';


export default React.createClass({
  render: function() {
    return (
      <div id='copyright'>
        <Grid>
          <Row className='mb-half'>
            <Col xs={12} style={{textAlign:'center'}}>
              <span>&copy;</span> Copyright {new Date().getFullYear()}. All rights reserved. Anna Lancaster Fine Art. PO Box 3110. Tualatin Oregon 97062.
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});
