import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Location, Link} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

import * as actionCreators from '../actions/artActionCreators';
import {Fetching, ImageLoader} from '../components';

import constants from '../constants';
var Masonry = require('react-masonry-component')(React);
var masonryOptions = {
  transitionDuration: 0,
  itemSelector: '.grid-item',
  percentPosition: true,
  imagesLoaded: true,
  transitionDuration: '0.8s',
};
require('./Art.less');


export const Art = React.createClass({
  mixins: [PureRenderMixin],

  getGalleryName: function() {
    let g = constants.galleries.find(item => item.slug === this.props.routeParams.gallerySlug);
    return g && g.name || '';
  },
  isFetching: function() {
    return this.props.art.get('isFetching');
  },
  hasFetched: function() {
    return this.props.art.get('hasFetched');
  },
  hasItems: function() {
    return this.props.art.get('items').count() > 0;
  },
  componentWillMount: function() {
    if (this.hasFetched()) {
      this.props.fetchArt();
    }
  },
  render: function() {
    return (
      <div id='art-wrap'>
        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <h3>{this.getGalleryName()}</h3>
            </Col>
            <Col xs={12}>
              {this.isFetching() && <Fetching label='fetching art' />}
            </Col>
            <Col xs={12}>
              {this.hasItems() && this.renderArt()}
            </Col>
          </Row>
        </Grid>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  },

  renderArt: function() {
    var art = this.props.art.get('items').toJS();
    var filtered = art.filter(item => {
      return item.galleries.indexOf(this.props.routeParams.gallerySlug) >= 0;
    });
    var mapped = filtered.map((item, i) => {
      return (
        <Col key={item.slug} lg={2} md={3} sm={4} xs={6} className='grid-item'>
          <Link to={this.props.location.pathname + '/' + item.slug}>
            <ImageLoader src={'/content/images/art/' + item.slug + '-md.jpg'} onLoad={this.imgLoaded} />
          </Link>
        </Col>
      );
    });
    return (
      <Masonry  className={'grid'}
                elementType={'div'}
                options={masonryOptions}
                disableImagesLoaded={false} ref='mmm'>
        {mapped}
      </Masonry>
    );
  },

  imgLoaded: function() {
    this.refs.mmm.performLayout()
  },

});


function mapStateToProps(state) {
  return {
    art: state.get('art')
  };
}

export const ArtContainer = connect(mapStateToProps, actionCreators)(Art);
