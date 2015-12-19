import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../app/reducers';
import {
    BLOG_REQUESTED,
    BLOG_RECEIVED,
    UPDATE_BLOG
} from '../../app/actions';

import blogPostRaw from '../data/blog-post-single-raw.json';
import blogPostProcessed from '../data/blog-post-single-processed.json';


describe('Blog reducer', () => {
    it('handle BLOG_REQUESTED', () => {
        const state = fromJS({
            blog: {
                isFetching: false,
            }
        });
        const action = {type: BLOG_REQUESTED}
        const nextState = reducer(state, action);

        expect(nextState.getIn(['blog', 'isFetching'])).to.be.true;
    });

    it('handle BLOG_RECEIVED', () => {
        const state = fromJS({
            blog: {
                isFetching: true,
            }
        });
        const action = {type: BLOG_RECEIVED}
        const nextState = reducer(state, action);

        expect(nextState.getIn(['blog', 'isFetching'])).to.be.false;
    });

    it('handle UPDATE_BLOG', () => {
        const state = fromJS({
            blog: {
                items: [],
            }
        });
        const action = {type: UPDATE_BLOG, data: {items:blogPostRaw}}
        const nextState = reducer(state, action);

        const items = nextState.getIn(['blog', 'items']);
        expect(items.count()).to.be.equal(1);

        const itemZero = items.first();
        const processedZero = fromJS(blogPostProcessed).first();
        expect(itemZero).to.be.equal(processedZero);

    });
});
