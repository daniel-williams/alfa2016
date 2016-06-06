import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';

import './News.less';


export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='classes'>
              <Helmet
                title='News for Anna Lancaster Fine Art'
                meta={[{
                  'name': 'description',
                  'content': 'Browse news articles of Anna Lancaster, Tualatin Oregon artist and owner of Anna Lancaster Fine Art.'
                }]}
              />
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3>News</h3>
                  </Col>
                </Row>
                {this.renderAnnouncements()}
              </Grid>
              {this.props.children}
            </div>
        );
    },

    renderAnnouncements() {
      return (
        <div className='announcements'>
          <div className='mt'><h4>Announcements and Press</h4></div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/tualatin-art-splash-top-honors_07-29-2015.pdf' target='_blank'>Tualatin ArtSplash Top Honors</a></span>
            <span className='date'>7/29/2015</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/tualatin-visual-chronicle_07-16-2015.pdf' target='_blank'>Tualatin Visual Chronicle</a></span>
            <span className='date'>7/16/2015</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/portland-tribune_07-16-2015.pdf' target='_blank'>Portland Tribune</a></span>
            <span className='date'>7/16/2015</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/tualatin-times_07-09-2015.pdf' target='_blank'>Tualatin Times</a></span>
            <span className='date'>7/9/2015</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/hillsboro-public-art-collection_03-26-2015.pdf' target='_blank'>Hillsboro Public Art Collection</a></span>
            <span className='date'>3/26/2015</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/oregonian-hillsboro-public-art-commission_03-23-2015.pdf' target='_blank'>Oregonian Hillsboro Public Art Commission</a></span>
            <span className='date'>3/23/2015</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/west-linn-public-library_12-21-2011.pdf' target='_blank'>West Linn Public Library</a></span>
            <span className='date'>12/21/2011</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/village-of-willamette-arts-festival_09-16-2006.pdf' target='_blank'>Village of Willamette Arts Festival</a></span>
            <span className='date'>9/16/2015</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/creations-full-of-life_10-18-2005.pdf' target='_blank'>Creations Full of Life</a></span>
            <span className='date'>10/18/2005</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/wilsonville-annual-festival-of-the-arts_05-20-2005.pdf' target='_blank'>Wilsonville Annual Festival of the Arts</a></span>
            <span className='date'>5/20/2005</span>
          </div>
          <div className='announcement'>
            <span className='title'><a href='/content/pdf/onda-gallery-home-grown.pdf' target='_blank'>Onda Gallery Home Grown</a></span>
            <span className='date'></span>
          </div>
        </div>
      )
    },

    renderClasses: function() {
      return (
        <Row>
          <Col xs={12}>
            <div className='mt'><h4>Classes and Workshops Coming Soon</h4></div>
            <p>Anna Lancaster teaches various aspects of landscape, still life and portraiture. Anna was classically trained and is skilled in the traditional method of indirect painting for classical portraiture and still life. She also is skilled in the direct painting method to paint landscape en plein air, as well as, painting still life and portraiture from live observation, alla prima.</p>
            <p>Contact Anna Lancaster by email for information about private and group instruction. Workshop opportunities will be posted as they become available.</p>
          </Col>
        </Row>
      );
    }
});