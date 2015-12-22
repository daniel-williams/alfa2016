const unSafeChars = /[^a-zA-Z0-9 _-]/g;
const multiWhitespace = /\s+/g;
const multiDash = /-+/g;
const trimDashes = /^-|-$/g;
const ampersandHtml = /&amp;/g;
const ampersandChar = /&/g;


export function toSlug(val) {
  let result = val.trim().toLowerCase();
  return result
    .replace(ampersandHtml, 'and')
    .replace(ampersandChar, 'and')
    .replace(unSafeChars, '-')
    .replace(multiWhitespace, '-')
    .replace(multiDash, '-')
    .replace(trimDashes, '');
}
