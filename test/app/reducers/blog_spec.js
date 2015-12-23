import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../../app/reducers';
import {
  BLOG_REQUESTED,
  BLOG_SUCCESS,
  BLOG_FAILED
}
from '../../../app/actions';
import blogPostRaw from '../../data/blog-post-single-raw.json';
import blogPostProcessed from '../../data/blog-post-single-processed.json';


describe('Blog reducer', () => {
  // `BLOG_REQUESTED`
  it('BLOG_REQUESTED sets isFetching', () => {
    const state = fromJS({
      blog: {
        isFetching: false,
      }
    });
    const action = {type: BLOG_REQUESTED}
    const nextState = reducer(state, action);

    expect(nextState.getIn(['blog', 'isFetching'])).to.be.true;
  });
  // BLOG_SUCCESS
  it('BLOG_SUCCESS sets isFetching', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        lastFetchDate: null,
        items: [],
      }
    });
    const action = {
      type: BLOG_SUCCESS,
      date: new Date(),
      items: blogPostRaw,
    }
    const nextState = reducer(state, action);

    expect(nextState.getIn(['blog', 'isFetching'])).to.be.false;
  });
  it('BLOG_SUCCESS sets isStale', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        isStale: true,
        lastFetchDate: null,
        items: [],
      }
    });
    const action = {
      type: BLOG_SUCCESS,
      date: new Date(),
      items: blogPostRaw,
    }
    const nextState = reducer(state, action);

    expect(nextState.getIn(['blog', 'isStale'])).to.be.false;
  });
  it('BLOG_SUCCESS sets lastFetchDate', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        lastFetchDate: null,
        items: [],
      }
    });
    const actionDt = new Date();
    const action = {
      type: BLOG_SUCCESS,
      date: actionDt,
      items: blogPostRaw,
    }
    const nextState = reducer(state, action);

    const lastFetchDate = nextState.getIn(['blog', 'lastFetchDate']);
    expect(lastFetchDate.getTime()).to.equal(actionDt.getTime());
  });
  it('BLOG_SUCCESS clears lastFetchError', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        lastFetchDate: null,
        lastFetchError: new Error('Boom goes the dynamite!'),
        items: [],
      }
    });
    const actionDt = new Date();
    const action = {
      type: BLOG_SUCCESS,
      date: actionDt,
      items: blogPostRaw,
    }
    const nextState = reducer(state, action);

    const lastFetchDate = nextState.getIn(['blog', 'lastFetchError']);
    expect(lastFetchDate).to.be.a('null');
  });
  it('BLOG_SUCCESS sets items', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        lastFetchDate: null,
        items: [],
      }
    });
    const action = {
      type: BLOG_SUCCESS,
      date: new Date(),
      items: blogPostRaw,
    }
    const nextState = reducer(state, action);

    const items = nextState.getIn(['blog', 'items']);
    expect(items.count()).to.be.equal(1);

    const itemZero = items.first();
    const processedZero = fromJS(blogPostProcessed).first();
    expect(itemZero).to.be.equal(processedZero);
  });
  it('BLOG_FAILED sets isFetching', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        lastFetchDate: null,
        items: [],
      }
    });
    const action = {
      type: BLOG_FAILED,
      date: new Date(),
      err: new Error('Boom goes the dynamite!'),
    }
    const nextState = reducer(state, action);

    expect(nextState.getIn(['blog', 'isFetching'])).to.be.false;
  });
  it('BLOG_FAILED sets isStale', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        isStale: true,
        lastFetchDate: null,
        items: [],
      }
    });
    const action = {
      type: BLOG_FAILED,
      date: new Date(),
      err: new Error('Boom goes the dynamite!'),
    }
    const nextState = reducer(state, action);

    expect(nextState.getIn(['blog', 'isStale'])).to.be.false;
  });
  it('BLOG_FAILED sets lastFetchError', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        lastFetchDate: null,
        items: [],
      }
    });
    const action = {
      type: BLOG_FAILED,
      date: new Date(),
      err: new Error('Boom goes the dynamite!'),
    }
    const nextState = reducer(state, action);

    const err = nextState.getIn(['blog', 'lastFetchError']);
    expect(err).to.be.instanceof(Error);
    expect(err.message).to.be.a('string');
    expect(err.message).to.be.equal('Boom goes the dynamite!');
  });
  it('BLOG_FAILED sets lastFetchDate', () => {
    const state = fromJS({
      blog: {
        isFetching: true,
        lastFetchDate: null,
        items: [],
      }
    });
    const actionDt = new Date();
    const action = {
      type: BLOG_FAILED,
      date: actionDt,
      err: new Error('Boom goes the dynamite!'),
    }
    const nextState = reducer(state, action);

    const lastFetchDate = nextState.getIn(['blog', 'lastFetchDate']);
    expect(lastFetchDate.getTime()).to.equal(actionDt.getTime());
  });
});
