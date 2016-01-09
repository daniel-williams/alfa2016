import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Location} from 'react-router';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import {Grid, Row, Col, Pager, PageItem, Pagination} from 'react-bootstrap';

import * as blogActions from '../actions/blogActionCreators';
import * as postsActions from '../actions/postsActionCreator';
require('./Blog.less');

import {Article, ArticleList, Fetching} from '../components';


const actions = Object.assign({}, blogActions, postsActions);

const Blog = React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount: function() {
    if(this.isBlogStale()) {
      this.props.fetchBlog();
    }
    if(this.isPostsStale()) {
      this.props.fetchPosts(this.props.blog.get('itemsPerPage'));
    }
  },
  hasFetched: function() {
    return (this.isBlogStale() || this.isPostsStale());
  },
  isBlogStale: function() {
    return this.props.blog.get('hasFetched');
  },
  isPostsStale: function() {
    return this.props.posts.get('hasFetched');
  },
  isFetching: function() {
    return (this.props.blog.get('isFetching') || this.props.posts.get('isFetching'));
  },
  getArticleSlug: function() {
    return this.props.params.articleSlug;
  },
  hasArticleSlug: function() {
    return !!this.getArticleSlug();
  },

  getItems: function() {
    return this.props.posts.get('items').toJS();
  },
  getItem: function(slug) {
    return this.getItems().find((item) => item.slug === slug);
  },

  getPageCount: function() {
    return this.props.blog.get('totalPages');
  },
  getActivePage: function() {
    return this.props.blog.get('activePage');
  },

  render: function() {
    return (
      <div id='blog'>
        <Grid>
          <Row>
            <Col xs={12}>
              {this.hasFetched() ? this.isFetching() && <Fetching />
                              : this.hasArticleSlug() ? <Article item={this.getItem(this.getArticleSlug())} {...this.props} />
                                                      : this.renderArticleList()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },
  renderArticleList: function() {
    return (
        <div>
          <div>
            {this.renderPager()}
          </div>
          <ArticleList items={this.getItems()} />
        </div>
    );
  },

  renderPager: function() {
    return (
      <Pager>
        <PageItem previous onClick={this.handlePagePrev}>Newer</PageItem>
        <PageItem next onClick={this.handlePageNext}>Older</PageItem>
      </Pager>
    );
  },
  handlePagePrev: function() {
    this.props.blogPagePrev();
  },
  handlePageNext: function() {
    this.props.blogPageNext();
  },
  // renderPagination: function() {
  //   return (
  //     <Pagination
  //       first='<<'
  //       last='>>'
  //       next='older'
  //       prev='newer'
  //       ellipsis={true}
  //       bsSize='small'
  //       maxButtons={5}
  //       items={this.getPageCount()}
  //       activePage={this.getActivePage()}
  //       onSelect={this.handleSelectPage} />
  //   );
  // },
  // handleSelectPage(event, selectedEvent) {
  //   this.props.setActivePage(selectedEvent.eventKey);
  //   console.log('setActivePage:', selectedEvent.eventKey);
  //   window && window.scrollTo(0,0);
  // },


});

function mapStateToProps(state) {
  return {
    blog: state.get('blog'),
    posts: state.get('posts'),
  }
}

export default connect(mapStateToProps, actions)(Blog);
