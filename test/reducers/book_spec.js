import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../src/reducers';
import {
    INDEX_REQUESTED,
    INDEX_RECEIVED,
    UPDATE_INDEX
} from '../../src/actions';

describe('book reducer', () => {

    it('handles INDEX_REQUESTED', () => {
        const state = fromJS({
            book: {
                isFetching: false
            }
        });
        const action = {type: INDEX_REQUESTED};
        const nextState = reducer(state, action);

        expect(nextState.getIn(['book', 'isFetching'])).to.be.true;
    });

    it('handles INDEX_RECEIVED', () => {
        const state = fromJS({
            book: {
                isFetching: true
            }
        });
        const action = {type: INDEX_RECEIVED};
        const nextState = reducer(state, action);

        expect(nextState.getIn(['book', 'isFetching'])).to.be.false;
    });

    it('handles UPDATE_INDEX', () => {
        const state = fromJS({
            book: {}
        });
        const action = {
            type: UPDATE_INDEX,
            chapters: [
                'chapter1.json',
                'chapter2.json'
            ]
        };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            book: {
                chapters: [
                    {url: 'chapter1.json', isFetching: false},
                    {url: 'chapter2.json', isFetching: false}
                ]
            }
        }));
    });
});
