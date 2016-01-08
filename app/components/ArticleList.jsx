import React, {PropTypes} from 'react';
import {Location} from 'react-router';
import {Pagination} from 'react-bootstrap';

import constants from '../constants';
import {Article, Fetching} from '.';


export default React.createClass({
  displayName: 'ArticleList',

  propTypes: {
    items: PropTypes.array,
    itemsPerPage: PropTypes.number,
  },
  getDefaultProps: function() {
    return {
      items: [],
      itemsPerPage: constants.itemsPerPage || 5,
    };
  },
  getInitialState: function() {
    return {
      activePage: 1,
    };
  },
  getPageCount: function() {
    return Math.ceil(this.props.items.length / this.props.itemsPerPage);
  },
  hasItems: function() {
    return this.props.items.length;
  },
  render: function() {
    return (
      <div className='article-list'>
        {this.hasItems() ? this.renderArticleList()
                         : <Fetching />}
      </div>
    );
  },
  getArticles: function() {
    const start = (this.state.activePage - 1) * this.props.itemsPerPage;
    const end = (start + this.props.itemsPerPage);
    return this.props.items.slice(start, end).map((item, idx) => <Article key={idx} item={item} {...this.props} />);
  },
  renderArticleList: function() {
    return (
      <div>
        <div className='pagination-wrap'>
          {this.renderPagination()}
        </div>
        {this.getArticles()}
        <div className='pagination-wrap'>
          {this.renderPagination()}
        </div>
      </div>
    );
  },
  renderPagination: function() {
    return (
      <Pagination
        first='<<'
        last='>>'
        next='older'
        prev='newer'
        ellipsis={true}
        bsSize='small'
        maxButtons={5}
        items={this.getPageCount()}
        activePage={this.state.activePage}
        onSelect={this.handleSelect} />
    );
  },

  handleSelect(event, selectedEvent) {
    this.setState({
      activePage: selectedEvent.eventKey
    }, () => window && window.scrollTo(0,0));
  },


});
