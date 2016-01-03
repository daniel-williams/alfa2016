import {Map, List, fromJS} from 'immutable';
import expect from 'expect';

import reducer from '../../../app/reducers';
import {
  BLOG_REQUESTED,
  BLOG_SUCCESS,
  BLOG_FAILED
} from '../../../app/actions';
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

    expect(nextState.getIn(['blog', 'isFetching'])).toExist();
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

    expect(nextState.getIn(['blog', 'isFetching'])).toNotExist();
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

    expect(nextState.getIn(['blog', 'isStale'])).toNotExist();
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
    expect(lastFetchDate.getTime()).toEqual(actionDt.getTime());
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
    expect(lastFetchDate).toNotExist();
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
    expect(items.count()).toBe(1);

    const itemZero = items.first();

    const processedZero = fromJS(blogPostProcessed).first();
    expect(itemZero).toEqual(processedZero);
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

    expect(nextState.getIn(['blog', 'isFetching'])).toNotExist();
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

    expect(nextState.getIn(['blog', 'isStale'])).toNotExist();
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
    expect(err).toBeA(Error);
    expect(err.message).toBeA('string');
    expect(err.message).toBe('Boom goes the dynamite!');
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
    expect(lastFetchDate.getTime()).toEqual(actionDt.getTime());
  });
});
