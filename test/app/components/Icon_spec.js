import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import {Icon} from '../../../app/components';


describe('Icon', () => {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Icon name='facebook' />);

  it('should create an <i> tag', () => {
    const actual = renderer.getRenderOutput().type;
    const expected = 'i';

    expect(actual).toBe(expected);
  });

  it('should render css class based on name prop', () => {
    const actual = renderer.getRenderOutput().props.className.includes('icon-alfa-facebook');
    const expected = true;

    expect(actual).toEqual(expected);

  });

});
