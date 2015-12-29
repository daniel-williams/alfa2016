import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Grid, Row, Col} from 'react-bootstrap';

import {ImageLoader} from '../components/sky';

export default React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return (
            <div id='about-wrap' className='sec-wrap'>
              <Row>
                <Col md={6} sm={12}>
                  <h1>About the Artist</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nunc urna, feugiat sit amet justo sed, volutpat fermentum orci. Nulla eget nunc malesuada, sagittis odio sit amet, dapibus nunc. Integer nec facilisis ex, sed accumsan metus. Fusce scelerisque eros quis lacus efficitur condimentum. Proin mattis ipsum a sollicitudin commodo. Donec ac quam imperdiet, facilisis sem dictum, efficitur dui. Nam vehicula congue mollis. Sed a mollis nisl, sit amet convallis purus. Ut iaculis diam justo, sit amet rutrum ligula pellentesque a. Morbi urna nisl, mollis sed lacus at, sodales dapibus quam. Proin a massa luctus, condimentum libero at, fermentum nulla. Nullam laoreet enim eget dolor porta, vel dignissim ligula mattis. Donec et porta massa.</p>
                  <p>Etiam congue ultrices elit, in posuere metus placerat eu. Aenean eu mi luctus, blandit elit ut, laoreet augue. Vivamus imperdiet nisl non magna lacinia, et convallis arcu lobortis.</p>
                </Col>
                <Col md={6} sm={12} xs={12} className={'pull-right'}>
                  <Row>
                    <Col md={12} sm={6} xs={12}>
                      <ImageLoader src='/content/images/anna-lancaster-headshot.jpg' className='img-responsive' />
                    </Col>
                    <Col md={12} sm={6} xs={12}>
                      <ImageLoader src='/content/images/anna-lancaster-painting.jpg' className='img-responsive' />
                    </Col>
                  </Row>
                </Col>
                <Col md={6} sm={12} >
                  <h1>Artists' Inpiration</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nunc urna, feugiat sit amet justo sed, volutpat fermentum orci. Nulla eget nunc malesuada, sagittis odio sit amet, dapibus nunc. Integer nec facilisis ex, sed accumsan metus. Fusce scelerisque eros quis lacus efficitur condimentum. Proin mattis ipsum a sollicitudin commodo. Donec ac quam imperdiet, facilisis sem dictum, efficitur dui. Nam vehicula congue mollis. Sed a mollis nisl, sit amet convallis purus. Ut iaculis diam justo, sit amet rutrum ligula pellentesque a. Morbi urna nisl, mollis sed lacus at, sodales dapibus quam. Proin a massa luctus, condimentum libero at, fermentum nulla. Nullam laoreet enim eget dolor porta, vel dignissim ligula mattis. Donec et porta massa.</p>
                  <p>Etiam congue ultrices elit, in posuere metus placerat eu. Aenean eu mi luctus, blandit elit ut, laoreet augue. Vivamus imperdiet nisl non magna lacinia, et convallis arcu lobortis.</p>
                </Col>
              </Row>
            </div>
        );
    }
});
