import React from 'react';
import ReactDom from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/artActionCreators';
import ImageLoader from '../components/sky/ImageLoader';
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
  componentDidMount: function() {
    var test = ReactDom.findDOMNode(this.refs.mmm);
  },
  render: function() {
    return (
      <div style={{marginTop:'30px'}}>
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
      return item.galleries.indexOf(this.props.routeParams.gallery) >= 0;
    });
    var mapped = filtered.map((item, i) => {
      return (
        <Col key={i} lg={2} md={3} sm={4} xs={6} className='grid-item'>
          <a href='#'>
            <ImageLoader src={'/content/images/art/sm_' + item.filename} onLoad={this.imgLoaded} />
          </a>
          <div>{''+item.created}</div>
          <div>{''+item.ticks}</div>
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
