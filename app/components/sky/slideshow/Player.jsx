import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actionCreators from '../../../actions/showActionCreators.js';
import {Controls, Slide} from '../../sky';


export const Player = React.createClass({
  mixins: [PureRenderMixin],

  isFetching: function() {
    return this.props.show.get('isFetching');
  },
  isStale: function() {
    return this.props.show.get('isStale');
  },
  hasItems: function() {
    return this.props.show.getIn(['show', 'items']).count() > 0;
  },
  showControls: function() {
    return this.hasItems() && this.props.show.getIn(['show', 'showControls']);
  },
  componentWillMount: function() {
    if (this.isStale()) {
      this.props.fetchShow();
    }
  },
  render: function() {
    return (
      <div className='sky-player mv'>
        {this.isFetching() && <div>fetching show...</div>}
        {this.hasItems() && this.renderShow()}
        {this.showControls() && this.renderControls()}
      </div>
    );
  },

  renderShow: function() {
    var active = this.props.show.get('active')
    var item = this.props.show.getIn(['show', 'items']).toJS()[active];

    var slide = <Slide
                    src={item.src}
                    alt={item.title}
                    title={item.title} />
    return (
      <div id='slide'>
        {slide}
      </div>
    );
  },
  renderControls: function() {
    return <Controls nextSlide={this.props.nextSlide} prevSlide={this.props.prevSlide} />
  },



});

function mapStateToProps(state) {
  return {
    show: state.get('show')
  }
}

export const PlayerContainer = connect(mapStateToProps, actionCreators)(Player);
