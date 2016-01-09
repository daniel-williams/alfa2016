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
        {this.props.items.map((item, idx) => <Article key={idx} item={item} {...this.props} />)}
      </div>
    );
  },
  // getArticles: function() {
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
  //       activePage={this.state.activePage}
  //       onSelect={this.handleSelect} />
  //   );
  // },

  // handleSelect(event, selectedEvent) {
  //   this.setState({
  //     activePage: selectedEvent.eventKey
  //   }, () => window && window.scrollTo(0,0));
  // },


});
