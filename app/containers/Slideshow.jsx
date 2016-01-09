import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import * as actions from '../actions/showActionCreators.js';
import {ImageLoader, SkyPlayer} from '../components';


const Show = React.createClass({

  isFetching: function() {
    return this.props.show.get('isFetching');
  },
  hasFetched: function() {
    return this.props.show.get('hasFetched');
  },
  hasItems: function() {
    return this.props.show.getIn(['show', 'items']).count() > 0;
  },
  componentWillMount: function() {
    if (this.hasFetched()) {
      this.props.fetchShow();
    }
  },
  render: function() {
    return (
      <div className='slideshow'>
        {this.isFetching() && <div>fetching show...</div>}
        {this.hasItems() && this.renderShow()}
      </div>
    );
  },

  renderShow: function() {
    var item = this.props.show.getIn(['show', 'items']).toJS();
    var slides = item.map(function(item, idx) {
      return <ImageLoader
        key={item.id}
        src={'/content/images/slideshow/' + item.src}
        alt={item.title}
        title={item.title}/>
    });

    return (
      <SkyPlayer items={slides} />
    );
  },

});

function mapStateToProps(state) {
  return {
    show: state.get('show')
  };
}

export default connect(mapStateToProps, actions)(Show);
