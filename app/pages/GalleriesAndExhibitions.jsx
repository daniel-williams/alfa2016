import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

require('./GalleriesAndExhibitions.less');


export default React.createClass({
  render: function() {
    return (
      <div id='galleries-and-exhibitions'>
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
                  <div>Winter Art Show</div>
                  <div>Marilyn Affolter Fine Art Gallery</div>
                </div>
                <div className='hours'>
                  <div>November 4 - December 19, 3:00 - 7:00 PM</div>
                </div>
                <div className='address'>
                  <div>Marilyn Affolter Fine Art Gallery</div>
                  <div>325 NE Evans</div>
                  <div>McMinnville, Oregon 97128</div>
                </div>
                <div className='notes'>
                  <div>This show features works from Anna Lancaster and other local artists including Marilyn Affolter, Dee Boyles, Jeanne Drevas, Deb Perry-Guetti, Lori Wallace-Lloyd, Mary Rash, Amy Brodie-Scout, Marj Engle, Andrew Lonnquist, Cheryl Hudson and Maida Cummings. Visit the gallery on the third Saturday of November, the 21st for their 2 year anniversary celebration.</div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>Big 500 Show &amp; Sale</div>
                  <div>Peoples Art of Portland</div>
                </div>
                <div className='hours'>
                  <div>December 13, 2015 - January 11, 2016</div>
                  <div>Thursday - Sunday, 12:00 - 6:00 pm</div>
                </div>
                <div className='address'>
                  <div>Peoples Art Portland Gallery</div>
                  <div>Pioneer Square Mall</div>
                  <div>700 SW 5th Avenue</div>
                  <div>Suite 4005 (3rd floor)</div>
                  <div>Portland, Oregon 97204</div>
                  <div><span className='inline-lbl'>Phone:</span>(503) 267-5993</div>
                  <div><a href="https://www.facebook.com/events/665465280241506/?pnref=story" title="Visit the Facebook page for more Info" target="_blank">Facebook Page &amp; Event Info</a></div>
                </div>
                <div className='notes'>
                  <div>The Peoples Art of Portland annual major group show consists of over 600 regional artists ages 4 - 80 making original artworks on 8" x 8" wood panels, all sold for $40 each and part of the proceeds benefit Oregon Food Bank.</div>
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
