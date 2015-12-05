import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/creators';

export const Book = React.createClass({
    mixins: [PureRenderMixin],

    isFetching: function() {
        return this.props.isFetching;
    },
    isBookLoaded: function() {
        return List.isList(this.props.chapters) && this.props.chapters.count() > 0
    },
    render: function() {
        return (
            <div className='book'>
                <h1>Book List</h1>
                {!this.isBookLoaded() && <button className='btn' onClick={() => this.props.fetchIndex()}>get index</button>}
                {this.isFetching() && <div>fetching...</div>}
                {this.renderIndex()}
            </div>
        );
    },
    renderIndex: function() {
        var chapters = this.props.chapters.map((item, i) => {
            var chapterUi = item.has('content') ? this.renderChapter(i, item)
                                                : this.renderTitle(i, item);

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
    renderTitle: function(i, item) {
        var url = item.get('url');
        return (
            <div style={{margin:'10px'}}>
                <h2 onClick={() => this.props.getChapter(i, url)} style={{cursor:'pointer'}}>Chapter {i+1}</h2>
            </div>
        );
    },

});

function mapStateToProps(state) {
    var isFetching = state.getIn(['book', 'isFetching']);
    var chapters = state.getIn(['book', 'chapters']);
    return {
        isFetching,
        chapters
    }
}

export const BookContainer = connect(mapStateToProps, actionCreators)(Book);
