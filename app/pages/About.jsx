import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';

import {ImageLoader} from '../components';
require('./About.less');

export default React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        return (
            <div id='about'>
              <Helmet
                title='About Anna Lancaster Tualatin Oregon Artist'
                meta={[{
                  'name': 'description',
                  'content': 'Anna Lancaster paints diversified styles of fine art including portraits, contemporary, and plein air landscapes in oil.'
                }]}
              />
              <Grid>
                <Row>
                  <Col md={6} sm={12} className='mb'>
                    <h3>About the Artist</h3>
                    <p>Anna Lancaster enjoys diversified styles of creative expression including portraiture, contemporary and plein air landscape painting in oil. Her recent body of work explores contemporary still life in oil. Anna has expanded her contemporary art to include vibrant mixed media using pastel, oil impasto and acrylics.</p>
                    <p>Identifying herself as a "Beautiful Art Revivalist", Anna markets her work under the auspices of her company, Anna Lancaster Fine Art. She has sold and exhibited work in Oregon since 1995.</p>
                    <p>Born in New Jersey, Anna moved to Oregon in 1991, which resulted in her shifting her career focus from graphic illustration and design to professional fine artist. Anna works and resides with her family in Tualatin, Oregon.</p>
                  </Col>
                  <Col md={6} sm={12} xs={12} className={'pull-right'}>
                    <Row className='img-wrap'>
                      <Col md={12} sm={6} xs={12} className='mb'>
                        <ImageLoader src='/content/images/anna-lancaster-headshot.jpg' className='img-responsive'/>
                      </Col>
                      <Col md={12} sm={6} xs={12} className='mb'>
                        <ImageLoader src='/content/images/anna-lancaster-painting.jpg' className='img-responsive' />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} sm={12}>
                    <h3>Artists' Inspiration</h3>
                    <p>God's masterful creation astounds and inspires me. I count the attribute of creativity to be one of His many precious gifts to humanity. I am given fully in love and admiration to His gift of art. It compels me to creatively rejoice in the mystery and majesty of His design.</p>
                    <p>Whether I am indulging in the joyous color exlosion of my nature abstracts or tenderly rendering a precious moment of time in the classical style of the masters, I accept the challenge to capture the joy and magic of the beauty my eyes have witnessed and my heart longs to express. May you be inspired to create as well.</p>
                    <p className='mt-dbl'>Download <a href='/content/pdf/anna-lancaster-resume-2016.pdf' target='_blank'>Artist Statement &amp; Resume</a></p>
                    <p className='mt'>Download <a href='/content/pdf/anna-lancaster-artist-bio-2016.pdf' target='_blank'>Artist Bio</a></p>
                  </Col>
                </Row>
              </Grid>
              {this.props.children}
            </div>
        );
    }
});
