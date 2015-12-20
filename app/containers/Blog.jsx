import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map, List, fromJS, toJS} from 'immutable';

import * as actionCreators from '../actions/blogActionCreators';
require('./Blog.less');


export const Blog = React.createClass({
    mixins: [PureRenderMixin],

    isFetching: function() {
        return this.props.blog.get('isFetching');
    },
    isLoaded: function() {
        return this.props.blog.get('items').count() > 0;
    },
    componentWillMount: function() {
      console.log('WFT');
        if(!this.isLoaded()) {
            this.props.fetchArticleList();
        }
    },
    render: function() {
        var articles = this.props.blog.get('items').map((item, i) => this.renderArticle(item.toJS(), i));
        return (
            <div id='blog' className='container'>
                <div className='col-xs-12'>
                    {articles}
                </div>
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
                    <h1>{item.title}</h1>
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
    }

});


function mapStateToProps(state) {
    return {
        blog: state.get('blog')
    }
}

export const BlogContainer = connect(mapStateToProps, actionCreators)(Blog);
