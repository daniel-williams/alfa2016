import {expect} from 'chai';

import {toSlug} from '../../app/slug-utils';

const whitespace = '  Whitespace   should be trimmed and collapsed to  a   single dash   ';
const whitespaceExpected = 'whitespace-should-be-trimmed-and-collapsed-to-a-single-dash';

const title = 'LIONS tIgErs and Bears Oh my!';
const titleExpected = 'lions-tigers-and-bears-oh-my';

const ampersands = 'Stills & Portraits. Stills &amp; Portraits.'
const ampersandsExpected = 'stills-and-portraits-stills-and-portraits';

const special = 'Special character () <> {} [] ~|!@#$%^&*_-+= test.';
const specialExpected = 'special-character-and-_-test';

describe('Slug Utils', () => {

  it('should handle whitespace', () => {
    var result = toSlug(whitespace);

    expect(result).to.equal(whitespaceExpected);
  });

  it('should convert to lower case', () => {
    var result = toSlug(title);

    expect(result).to.equal(titleExpected);
  });

  it('should convert ampersands to "and"', () => {
    var result = toSlug(ampersands);

    expect(result).to.equal(ampersandsExpected);
  });

  it('should collapse unsafe characters to single dashes', () => {
    var result = toSlug(special);

    expect(result).to.equal(specialExpected);
  });

});
