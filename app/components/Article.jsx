import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {Fetching} from '.';


export default React.createClass({
  displayName: 'Article',

  propTypes: {
    displayBreadcrumb: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      item: null,
      displayBreadcrumb: false,
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
    const item = this.getItem();
    return (
      <article>
        {this.props.renderBreadcrumb && this.renderBreadcrumb(item.title)}
        <header>
          <Link to={'/blog/' + item.slug}><h3 className='title' onClick={this.scrollTop}>{item.title}</h3></Link>
        </header>
        <div dangerouslySetInnerHTML={{__html:item.content}} />
        <footer>
          {item.tags && item.tags.length && this.renderTags(item.tags)}
        </footer>
      </article>
    );
  },
  renderTags : function(tags) {
    return (
      <div className='tags-wrap'>
        <span className='title'>Tags:</span>
        <span className='tags'>
          {tags.map((tag, i) => <span key={i}>{tag}</span>)}
        </span>
      </div>
    );
  },
  renderBreadcrumb: function(title) {
    return (
      <Breadcrumb>
        <li><Link to='/blog'>Blog</Link></li>
        <BreadcrumbItem active>{title}</BreadcrumbItem>
      </Breadcrumb>
    );
  },
  scrollTop: function() {
    window && window.scrollTo(0,0);
  }

});
