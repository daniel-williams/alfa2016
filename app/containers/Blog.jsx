import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import {Link, Location} from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

import {Fetching} from '../components'
import * as actionCreators from '../actions/blogActionCreators';
require('./Blog.less');


export const Blog = React.createClass({
  mixins: [PureRenderMixin],

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
  render: function() {
    var articles = this.props.blog.get('items').map((item, i) => this.renderArticle(item.toJS(), i));
    var error = this.props.blog.get('lastFetchError')
    if(error) {
      console.log(error);
    }
    return (
      <div id='blog'>
        <Grid>
          <Row>
            <Col xs={12}>
              {this.isFetching() && <Fetching label='fetching articles' />}
              {error && <div className='error'>{error.message}</div>}
            </Col>
            <Col xs={12}>
              {articles}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  },

  renderArticle: function(item, i) {
      var tags = null;
      if(item.tags && item.tags.length > 0) {
          tags = this.renderTags(item.tags);
      }

      return (
          <section key={i} className='mb-tpl'>
              <header>
                  <Link to={'/blog/' + item.slug}><h3>{item.title}</h3></Link>
              </header>
              <article>
                  <div dangerouslySetInnerHTML={{__html:item.content}} />
              </article>
              <footer>
                  {tags}
              </footer>
          </section>
      );
  },
  renderTags: function(tags) {
      var tagUi = tags.map((item, i) =>
          <span className='tag'><a href='#'>{item}</a></span>
      );
      return (
          <div>
              <span style={{fontWeight:'bold'}}>Tags: </span><span className='tags'>{tagUi}</span>
          </div>
      );
  }

});


function mapStateToProps(state) {
    return {
        blog: state.get('blog')
    }
}

export const BlogContainer = connect(mapStateToProps, actionCreators)(Blog);
