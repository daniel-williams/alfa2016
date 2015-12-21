import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/galleryActionCreators';

export const Art = React.createClass({
  mixins: [PureRenderMixin],

  isFetching: function() {
    return this.props.art.get('isFetching');
  },
  isLoaded: function() {
    return this.props.art.get('items').count() > 0;
  },
  componentWillMount: function() {
    if (!this.isLoaded()) {
      console.log('fetching art');
      this.props.fetchArt();
    }
  },
  render: function() {
    var art = this.props.art.get('items').map((item, i) => {
      return <div key={i} dangerouslySetInnerHTML={{__html: item. get( 'title')}}/>;
    });
    return (
      <div>
        <div>Art</div>
        {this.isFetching() && <div>fetching art...</div>}
        {this.isLoaded() && art}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    art: state.get('art')
  };
}

export const ArtContainer = connect(mapStateToProps, actionCreators)(Art);
