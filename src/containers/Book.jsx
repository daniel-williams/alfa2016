import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List, Map} from 'immutable';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/creators';

export const Book = React.createClass({
    mixins: [PureRenderMixin],

    isFetching: function() {
        return this.props.book.get('isFetching');
    },
    isBookLoaded: function() {
        return this.props.book.get('chapters').count() > 0
    },
    getBookUrl: function() {
        return this.props.book.get('url');
    },
    render: function() {
        return (
            <div className='book'>
                <h1>Book List</h1>
                {!this.isBookLoaded() && <button className='btn' onClick={() => this.props.fetchIndex(this.getBookUrl())}>get index</button>}
                {this.isFetching() && <div>fetching...</div>}
                {this.renderIndex()}
            </div>
        );
    },
    renderIndex: function() {
        var chapters = this.props.book.get('chapters').map((item, i) => {
            var chapterUi = item.has('content') ? this.renderChapter(i, item)
                                                : this.renderTitleOnly(i, item);

            return (
                <div key={i}>
                    {chapterUi}
                </div>
            );
        });
        return (
            <div>
                <h3>Chapter Index</h3>
                {chapters}
            </div>
        );
    },
    renderChapter: function(i, item) {
        var content = item.get('content');
        return (
            <div style={{margin:'10px'}}>
                <h2>Chapter {i+1}</h2>
                <div dangerouslySetInnerHTML={{__html:content}} />
            </div>
        );
    },
    renderTitleOnly: function(i, item) {
        return (
            <div style={{margin:'5px'}}>
                <h2 onClick={() => this.props.getChapter(i, item.get('url'))} style={{cursor:'pointer'}}>Chapter {i+1}</h2>
            </div>
        );
    },

});

function mapStateToProps(state) {
    return {
        book: state.get('book')
    }
}

export const BookContainer = connect(mapStateToProps, actionCreators)(Book);
