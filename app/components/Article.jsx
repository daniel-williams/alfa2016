import React, {PropTypes} from 'react';
import {Location} from 'react-router';

export default React.createClass({
  displayName: 'Article',

  render: function() {
    const item = this.props.item;
    return (
      <article>
        <header>
          <a onClick={this.handleClick('/blog/' + item.slug)}><h3 className='title'>{item.title}</h3></a>
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

  handleClick: function(url) {
    var self = this;
    return function() {
      window && window.scrollTo(0,0);
      self.props.history.pushState(null, url);
    };
  }

});
