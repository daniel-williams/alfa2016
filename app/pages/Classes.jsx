import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';


export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='classes'>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>Classes and Workshops</h3>
                    <p>Anna Lancaster teaches various aspects of landscape, still life and portraiture. Anna was classically trained and is skilled in the traditional method of indirect painting for classical portraiture and still life. She also is skilled in the direct painting method to paint landscape en plein air, as well as, painting still life and portraiture from live observation, alla prima.</p>
                    <p>Contact Anna Lancaster by email for information about private and group instruction. Workshop opportunities will be posted as they become available.</p>
                    <div className='mt'><h4>Schedule</h4></div>
                    <p>Coming soon, please check back.</p>
                  </Col>
                </Row>
              </Grid>
              {this.props.children}
            </div>
        );
    }
});
