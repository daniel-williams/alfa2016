import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators.js';

export const Book = React.createClass({
    mixins: [PureRenderMixin],

    isFetching: function() {
        return this.props.isFetching;
    },
    render: function() {
        return (
            <div className='book'>
                <h2>Book</h2>
                <button className='btn' ref='more' onClick={() => this.props.fetchIndex()}>get index</button>
                {this.isFetching() &&
                    <div>fetching...</div>}
                {this.renderChapters()}
            </div>
        );
    },
    renderChapters: function() {
        var chapters = this.props.chapters.map(function(item, i) {
            item = item.toJS();
            return (
                <div key={i}>
                    <h4>Chapter {i+1}</h4>
                    {item.url}
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
