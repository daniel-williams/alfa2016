import React from 'react';
import ReactDom from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Location, Link} from 'react-router';

import * as actionCreators from '../actions/artActionCreators';
import {ImageLoader} from '../components/sky';
import {Col} from 'react-bootstrap';

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

  isFetching: function() {
    return this.props.art.get('isFetching');
  },
  isStale: function() {
    return this.props.art.get('isStale');
  },
  hasItems: function() {
    return this.props.art.get('items').count() > 0;
  },
  componentWillMount: function() {
    if (this.isStale()) {
      this.props.fetchArt();
    }
  },
  render: function() {
    return (
      <div className='mv'>
        {this.isFetching() && <div>fetching art...</div>}
        {this.hasItems() && this.renderArt()}
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
