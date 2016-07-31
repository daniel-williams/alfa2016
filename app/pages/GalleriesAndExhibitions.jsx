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
                  <div>Water Works Exhibition 2016</div>
                  <div>Watertower Gallery</div>
                </div>
                <div className='hours'>
                  <div>July 1 - 31, 2016</div>
                </div>
                <div className='address'>
                  <div>45098 Main Street Watertower, Box 424</div>
                  <div>Mendocino, California 94360</div>
                  <div>Phone: (707) 937-5664</div>
                  <div><a href='http://www.SuziLong.com' target='_blank'>www.SuziLong.com</a></div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>Willamette Valley Lavender Plein Air Exhibition</div>
                  <div>Brazier Studio and Gallery, Inc.</div>
                </div>
                <div className='hours'>
                  <div>July 9 - 10, 2016</div>
                  <div>Saturday 10:00 am – 6:00 pm</div>
                  <div>Sunday 10:00 am – 5:00 pm</div>
                </div>
                <div className='address'>
                  <div>Chehalem Cultural Center Ballroom</div>
                  <div>415 Sheridan Street</div>
                  <div>Newberg, Oregon 97132</div>
                  <div><a href='https://www.facebook.com/WillametteValleyLavenderFestival/?fref=nf' target='_blank'>Facebook Page & Event Info</a></div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>ArtSplash Show and Sale</div>
                  <div>Tualatin Commons</div>
                </div>
                <div className='hours'>
                  <div>July 22 - 24, 2016</div>
                  <div>Friday 12:00 – 9:00 pm</div>
                  <div>Saturday 11:00 am – 8:00 pm</div>
                  <div>Sunday 11:00 am – 4:00 pm</div>
                </div>
                <div className='address'>
                  <div>Tualatin Commons</div>
                  <div>8325 SW Nyberg Street</div>
                  <div>Tualatin, Oregon 97062</div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>Umpqua Valley Plein Air</div>
                  <div>Umpqua Valley Arts Association</div>
                </div>
                <div className='hours'>
                  <div>September 17, 2016 – October 28, 2016</div>
                  <div>Tuesday – Friday 10:00 am – 4:00 pm</div>
                  <div>Saturday 10:00 am – 2:00 pm</div>
                  <div>Closed Sunday, Monday & all Major Holidays</div>
                </div>
                <div className='address'>
                  <div>Umpqua Valley Arts Association</div>
                  <div>1624 West Harvard Avenue</div>
                  <div>Roseburg, Oregon 97471</div>
                  <div>Phone: (541) 672-2532</div>
                  <div><a href='http://www.uvarts.com/umpqua-plein-air' target='_blank'>www.uvarts.com/umpqua-plein-air</a></div>
                  <div><a href='https://www.facebook.com/search/219558844296/local_search?surface=tyah' target='_blank'>Facebook Page & Event Info</a></div>
                </div>
                <div className='notes'>
                  <div>Join Anna Lancaster for the Opening Reception September 17 from 1:00 – 3:00 pm.</div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>Washington County Plein Air</div>
                  <div>Sequoia Gallery Hillsboro</div>
                </div>
                <div className='hours'>
                  <div>September 28, 2016 – October 2, 2016</div>
                </div>
                <div className='address'>
                  <div>Exhibition Bag & Baggage Production</div>
                  <div>4th and Main</div>
                  <div>Downtown Hillsboro, Oregon</div>
                  <div><a href='https://www.facebook.com/pleinairatwashingtoncounty/' target='_blank'>Facebook Page & Event Info</a></div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>Portland Open Studios</div>
                  <div>Anna Lancaster’s Home Studio Tualatin</div>
                </div>
                <div className='hours'>
                  <div>October 10 – 11, 2016 and October 17 – 18, 2016</div>
                  <div>Monday – Tuesday 10:00 am – 5:00 pm</div>
                </div>
                <div className='address'>
                  <div>Anna Lancaster Fine Art – Home Studio</div>
                  <div>Phone: (804) 358-2771</div>
                  <div><a href='http://www.PortlandOpenStudios.com' target='_blank'>www.PortlandOpenStudios.com</a></div>
                </div>
                <div className='notes'>
                  <div>The tour takes place throughout the Portland metro area in Clackamas County, Multnomah County, and Washington County. To find the artists, you will need a map – which is also your ticket. You can buy a ticket/tour guide that features both Eastside and Westside maps and neighborhood maps, along with artwork from the participating artists, the artists’ contact information, and the media(s) they work in for $15. Buy your <a href='http://portlandopenstudios.com/tourguide/#singleTG' target='_blank'>Map Here</a>. You can also buy a Mobile App with images from the participating artists, google map integration, the ability to plan which artists you will see and take notes about the artists you’ve visited and more. The Portland Open Studios App is $4.99, available for both iPhone and Android. Buy your Mobile <a href='http://portlandopenstudios.com/tourguide/#App' target='_blank'>App Here</a>.</div>
                </div>
              </div>








              <div className='venue'>
                <div className='title'>
                  <div>Washington County Open Studios</div>
                  <div>Anna Lancaster’s Home Studio Tualatin</div>
                </div>
                <div className='hours'>
                  <div>October 15 – 16, 2016</div>
                  <div>Saturday – Sunday 11:00 am – 5:00 pm</div>
                </div>
                <div className='address'>
                  <div>Anna Lancaster Fine Art – Home Studio</div>
                  <div>Tualatin, Oregon 97062</div>
                  <div><a href='http://www.WashCoArt.org' target='_blank'>www.WashCoArt.org</a></div>
                </div>
              </div>

              <div className='venue'>
                <div className='title'>
                  <div>Washington County Open Studios Sneak Preview Exhibit</div>
                  <div>Beaverton City Hall</div>
                </div>
                <div className='hours'>
                  <div>September - October, 2016</div>
                  <div>Monday - Friday 8:00 am – 5:00 pm</div>
                </div>
                <div className='address'>
                  <div>Beaverton City Hall</div>
                  <div>12725 SW Millikan Way, 1st – 4th Floors</div>
                  <div>Beaverton, Oregon</div>
                  <div><a href='http://www.WashCoArt.org' target='_blank'>www.WashCoArt.org</a></div>
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
