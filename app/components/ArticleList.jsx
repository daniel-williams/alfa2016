import React, {PropTypes} from 'react';
import {Location} from 'react-router';
import {Pagination} from 'react-bootstrap';

import constants from '../constants';
import {Article, Fetching} from '.';


export default React.createClass({
  displayName: 'ArticleList',

  propTypes: {
    items: PropTypes.array,
  },
  getDefaultProps: function() {
    return {
      items: [],
    };
  },
  hasItems: function() {
    return this.props.items.length;
  },
  render: function() {
    return (
      <div className='article-list'>
        {this.props.items.map((item, idx) => <Article key={item.slug} item={item} />)}
      </div>
    );
  },

});
