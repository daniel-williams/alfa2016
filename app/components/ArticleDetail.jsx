import React, {PropTypes} from 'react';
import {Location} from 'react-router';
import {Article, Fetching} from '.';


export default React.createClass({
  displayName: 'ArticleDetail',

  getDefaultProps: function() {
    return {
      item: null,
    };
  },
  hasItem: function() {
    return !!this.props.item;
  },
  getItem: function() {
    return this.props.item;
  },
  render: function() {
    return this.hasItem() ? this.renderArticle()
                          : <Fetching />
  },
  renderArticle: function() {
    return (
      <div className='article-detail'>
        <Article item={this.getItem()} {...this.props} />
      </div>
    );
  },
});
