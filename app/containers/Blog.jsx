import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Location} from 'react-router';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import {Grid, Row, Col} from 'react-bootstrap';

import * as actions from '../actions/blogActionCreators';
require('./Blog.less');

import {ArticleDetail, ArticleList} from '../components';


const Blog = React.createClass({
  // mixins: [PureRenderMixin],

  isFetching: function() {
    return this.props.blog.get('isFetching');
  },
  isStale: function() {
    return this.props.blog.get('isStale');
  },
  componentWillMount: function() {
    if(this.isStale()) {
      this.props.fetchArticleList();
    }
  },
  getItems: function() {
    return this.props.blog.get('items').toJS();
  },
  getItem: function(slug) {
    return this.getItems().find((item) => item.slug === slug);
  },
  getSlug: function() {
    return this.props.params.articleSlug;
  },
  render: function() {
    const articleSlug = this.getSlug();
    return (
      <div id='blog'>
        <Grid>
          <Row>
            <Col xs={12}>
              {!articleSlug ? <ArticleList items={this.getItems()} {...this.props}/>
                            : <ArticleDetail item={this.getItem(articleSlug)} {...this.props} />}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },

});

function mapStateToProps(state) {
    return {
        blog: state.get('blog')
    }
}

export default connect(mapStateToProps, actions)(Blog);
