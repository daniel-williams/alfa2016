import {Map, fromJS} from 'immutable';
import reducer from '../src/reducer';

import {expect} from 'chai';

describe('reducer', () => {

    it('handles INDEX_REQUESTED', () => {
        const state = fromJS({
            book: {
                isFetching: false
            }
        });
        const action = {type: 'INDEX_REQUESTED'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            book: {
                isFetching: true
            }
        }));
    });

    it('handles INDEX_RECEIVED', () => {
        const state = fromJS({
            book: {
                isFetching: true
            }
        });
        const action = {type: 'INDEX_RECEIVED'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            book: {
                isFetching: false
            }
        }));
    });

    it('handles UPDATE_INDEX', () => {
        const state = fromJS({
            book: {
            }
        });
        const action = {type: 'UPDATE_INDEX', chapters: [
            'chapter1.json',
            'chapter2.json'
        ]};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            book: {
                chapters: [
                    {url: 'chapter1.json', fetched: false},
                    {url: 'chapter2.json', fetched: false}
                ]
            }
        }));
    });
});
