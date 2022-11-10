// const extraTypeOf = function (obj) {
//   return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
// };

import extraTypeOf from './extraTypeOf.js';

const transform = (value) => {
  const keys = Object.keys(value);
  const result = [];

  if (typeof value === 'string') return value;
  keys.forEach((key) => {
    result.push({ sign: '', key, value: extraTypeOf(value[key]) === 'object' ? transform(value[key]) : value[key] });
  });

  return result;
};

const compare = (val1, val2) => {
  const keysSet = new Set([...Object.keys(val1), ...Object.keys(val2)]);
  const keys = Array.from(keysSet);
  const result = [];

  keys.forEach((key) => {
    if (val1[key] === val2[key]) {
      result.push({ sign: '', key, value: val1[key] });
    } else if (val1[key] === undefined
      && (val2[key] || val2[key] === false || val2[key] === null || val2[key] === 0)) {
      result.push({ sign: '+', key, value: extraTypeOf(val2[key]) !== 'object' ? val2[key] : transform(val2[key]) });
    } else if ((val1[key] || val1[key] === false || val1[key] === null || val1[key] === 0)
    && val2[key] === undefined) {
      result.push({ sign: '-', key, value: extraTypeOf(val1[key]) !== 'object' ? val1[key] : transform(val1[key]) });
    } else if (val1[key] !== val2[key]) {
      if (extraTypeOf(val1[key]) === 'object' && extraTypeOf(val2[key]) === 'object') {
        result.push({ sign: '', key, value: compare(val1[key], val2[key]) });
      } else if (extraTypeOf(val1[key]) === 'object' && extraTypeOf(val2[key]) !== 'object') {
        result.push({ sign: '-', key, value: extraTypeOf(val1[key]) !== 'object' ? val1[key] : transform(val1[key]) });
        result.push({ sign: '+', key, value: val2[key] });
      } else if (extraTypeOf(val1[key]) !== 'object' && extraTypeOf(val2[key]) === 'object') {
        result.push({ sign: '-', key, value: val1[key] });
        result.push({ sign: '+', key, value: extraTypeOf(val2[key]) !== 'object' ? val2[key] : transform(val2[key]) });
      } else if (extraTypeOf(val1[key]) !== 'object' && extraTypeOf(val2[key]) !== 'object') {
        result.push({ sign: '-', key, value: val1[key] });
        result.push({ sign: '+', key, value: val2[key] });
      }
    }
  });

  return result;
};

export default compare;
