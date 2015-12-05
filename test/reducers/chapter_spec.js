import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../src/reducers';
import {
    CHAPTER_REQUESTED,
    CHAPTER_RECEIVED,
    UPDATE_CHAPTER
} from '../../src/actions';


describe('chapter reducer', () => {

    it('handles CHAPTER_REQUESTED', () => {
        const state = fromJS({
            book: {
                chapters: [
                    {url: 'chapter1.json', isFetching: false},
                    {url: 'chapter2.json', isFetching: false}
                ]
            }
        });
        const action = {type: CHAPTER_REQUESTED, chapter: 1};

        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            book: {
                chapters: [
                    {url: 'chapter1.json', isFetching: false},
                    {url: 'chapter2.json', isFetching: true}
                ]
            }
        }))
    });
    it('handles CHAPTER_RECEIVED', () => {
        const state = fromJS({
            book: {
                chapters: [
                    {url: 'chapter1.json', isFetching: false},
                    {url: 'chapter2.json', isFetching: true}
                ]
            }
        });
        const action = {type: CHAPTER_RECEIVED, chapter: 1};

        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            book: {
                chapters: [
                    {url: 'chapter1.json', isFetching: false},
                    {url: 'chapter2.json', isFetching: false}
                ]
            }
        }))
    });
    it('handles UPDATE_CHAPTER', () => {
        const state = fromJS({
            book: {
                chapters: [
                    {url: 'chapter1.json'},
                    {url: 'chapter2.json'}
                ]
            }
        });
        const action = {type: UPDATE_CHAPTER, chapter: 2, content: 'chapter 2 content.'};
        const nextState = reducer(state, action);

        // expect(nextState.getIn(['book', 'chapters', 1, 'content'])).to.be.a('string');
        // expect(nextState.getIn(['book', 'chapters', 1, 'content'])).to.equal('chapter 2 content.');
    });
});
