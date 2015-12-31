import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import {Grid, Row, Col} from 'react-bootstrap';

import * as actionCreators from '../actions/blogActionCreators';
require('./Blog.less');


let someFrag = '<div>ima html frag</div>';

export const Article = React.createClass({
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
    let articleSlug = this.props.routeParams.articleSlug;
    var article = this.props.blog.get('items').toJS()
      .filter(item => {
        return item.slug === articleSlug;
      })
      .map((item, i) => this.renderArticle(item, i));

    return (
      <div id='blog-article' className='mv'>
        <Grid>
          <Row>
            <Col xs={12}>
              {article || this.renderNotFound()}
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
          <section>
              <header>
                  <h3>{item.title}</h3>
              </header>
              <article>
                  <div key={i} dangerouslySetInnerHTML={{__html:item.content}} />
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
  },

  renderNotFound: function() {
    return (
      <Col xs={12}>
        <h3>Article not found.</h3>
      </Col>
    );
  },


});


function mapStateToProps(state) {
    return {
        blog: state.get('blog')
    }
}

export const ArticleContainer = connect(mapStateToProps, actionCreators)(Article);
