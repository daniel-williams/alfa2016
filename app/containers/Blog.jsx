import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../actions/blogActionCreators';


export const Blog = React.createClass({
    mixins: [PureRenderMixin],

    isFetching: function() {
        return this.props.blog.get('isFetching');
    },
    isLoaded: function() {
        return this.props.blog.get('items').count() > 0;
    },
    componentWillMount: function() {
        // if(!this.isLoaded()) {
            this.props.fetchArticleList();
        // }
    },
    render: function() {
        var articles = this.props.blog.get('items').map((item, i) => {
            return <div key={i} dangerouslySetInnerHTML={{__html:item.get('title')}} />;
        });
        return (
            <div id='blog'>
                <div>Blog</div>
                {articles}
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
