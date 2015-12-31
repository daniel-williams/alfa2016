import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actionCreators from '../../../actions/showActionCreators.js';
import {Controls, Slide} from '../../sky';

let timer = null;

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
  componentDidMount: function() {
    timer = setInterval(this.props.nextSlide, 10000);
  },
  componentWillUnmount: function() {
    if(timer) {
      clearInterval(timer);
    }
  },
  render: function() {
    return (
      <div className='sky-player mv'>
        {this.isFetching() && <div>fetching show...</div>}
        {this.hasItems() && this.renderShow()}
      </div>
    );
  },

  renderShow: function() {
    var active = this.props.show.get('active');
    var item = this.props.show.getIn(['show', 'items']).toJS();

    var slides = item.map(function(item, idx) {
      return <Slide key={item.id}
                    src={item.src}
                    alt={item.title}
                    title={item.title}
                    active={idx === active} />
    });
    return (
      <div id='slides'>
        {slides}
      </div>
    );
  },

});

function mapStateToProps(state) {
  return {
    show: state.get('show')
  }
}

export const PlayerContainer = connect(mapStateToProps, actionCreators)(Player);
