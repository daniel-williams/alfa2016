import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import {Link} from 'react-router';

import * as actionCreators from '../actions/featureActionCreators';
import {toSlug} from '../slug-utils';


export const Feature = React.createClass({
  mixins: [PureRenderMixin],

  isFetching: function() {
    return this.props.feature.get('isFetching');
  },
  hasFetched: function() {
    return this.props.feature.get('hasFetched');
  },
  getFeature: function() {
    return this.props.feature.get('feature').toJS();
  },
  componentWillMount: function() {
    if(this.hasFetched()) {
      this.props.fetchFeature();
    }
  },
  render: function() {
    let feature = this.getFeature();

    return feature.title ? this.renderFeature(feature) : false;
  },

  renderFeature: function(feature) {
    let slug = toSlug(feature.title);

    return (
      <div id='feature'>
        <h3>{feature.title}</h3>
        <div dangerouslySetInnerHTML={{__html:feature.summary}} />
        <div className='mt-half'><Link to={'/blog/' + slug}><span onClick={this.scrollTop}>Continue reading...</span></Link></div>
      </div>
    );
  },

  scrollTop: function() {
    window && window.scrollTo(0,0);
  },

});


function mapStateToProps(state) {
    return {
        feature: state.get('feature')
    }
}

export const FeatureContainer = connect(mapStateToProps, actionCreators)(Feature);
