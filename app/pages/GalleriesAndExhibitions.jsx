import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';

require('./GalleriesAndExhibitions.less');


export default React.createClass({
  render: function() {
    return (
      <div id='galleries-and-exhibitions'>
        <Helmet
          title='Galleries & Exhibits for Anna Lancaster Fine Art'
          meta={[{
            'name': 'description',
            'content': 'Come see Anna Lancaster Fine Art oil paintings in person at these galleries and upcoming art exhibits in the Portland area.'
          }]}
        />
        <Grid>
          <Row>
            <Col sm={6} xs={12} className='galleries'>
              <h3>Galleries</h3>

              <div className='venue'>
                <div className='title'>
                  <div>Affolter Gallery</div>
                </div>
                <div className='address'>
                  <div>325 NE Evans</div>
                  <div>McMinnville, Oregon 97128</div>
                  <div><span className='inline-lbl'>Phone:</span>(503) 835-1610</div>
                </div>
                <div className='notes'>
                  <div>The Affolter Gallery has 3rd Saturday events from 5:00 - 8:00 PM, come on down.</div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>Emerald Art Center</div>
                </div>
                <div className='hours'>
                  <div>Tuesday - Saturday 11:00 AM - 4:00 PM</div>
                </div>
                <div className='address'>
                  <div>500 Main Street</div>
                  <div>Spring Field, Oregon 97477</div>
                  <div><span className='inline-lbl'>Phone:</span>(541) 726-8595</div>
                  <div><a href="http://emeraldartcenter.org/" title="Visit the Emerald Art Center Website" target="_blank">www.emeraldartcenter.org</a></div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>Forever Art Gallery</div>
                </div>
                <div className='hours'>
                  <div>Tuesday - Saturday 11:00 AM - 6:00 PM</div>
                  <div>First Thursdays till 9:00 PM</div>
                </div>
                <div className='address'>
                  <div>1991 NW Upshur St</div>
                  <div>Suibe B</div>
                  <div>Portland, Oregon 97209</div>
                  <div><span className='inline-lbl'>Phone:</span>(503) 267-5993</div>
                  <div><a href="http://www.foreverartnw.com/" title="Visit the Forever Art Gallery website" target="_blank">www.ForeverArtNW.com</a></div>
                </div>
              </div>

            </Col>
            <Col sm={6} xs={12} className='exhibitions'>
              <h3>Exhibitions</h3>

              <div className='venue'>
                <div className='title'>
                  <div>March Featured Artist</div>
                  <div>Affolter Gallery, McMinnville</div>
                </div>
                <div className='hours'>
                  <div>March 1, 2017 – March 31, 2017</div>
                  <div>Wednesday - Saturday 11:00 am – 4:00 pm</div>
                  <div>Or visit by appointment</div>
                </div>
                <div className='address'>
                  <div>Marilyn Affolter Fine Art Studio &amp; Gallery</div>
                  <div>325 Evans</div>
                  <div>McMinnville, Oregon</div>
                  <div>Phone: (503) 835-1610</div>
                  <div><a href='https://marilynaffolter.com' target='_blank'>https://marilynaffolter.com</a></div>
                </div>
              </div>


            </Col>
          </Row>
        </Grid>
        {this.props.children}
      </div>
    );
  }
});
