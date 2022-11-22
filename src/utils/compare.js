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

const comparePlain = (obj1, obj2) => {
  const keysSet = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  const keys = Array.from(keysSet);

  const result = [];

  keys.forEach((key) => {
    if (extraTypeOf(obj1[key]) === 'object' && extraTypeOf(obj2[key]) === 'object') {
      console.log('here')
      const treeResult = comparePlain(obj1[key], obj2[key]);
      result.push({
        key,
        children: treeResult,
        status: treeResult ? 'changed' : 'same',
      });
    } else if (obj1[key] === obj2[key]) {
      result.push({
        key,
        status: 'same',
        value: obj1[key],
      });
    } else if (obj1[key] !== obj2[key]) {
      if (obj1[key] === undefined) {
        result.push({
          key,
          status: 'added',
          value: obj2[key],
        });
      } else if (obj2[key] === undefined) {
        result.push({
          key,
          status: 'removed',
          value: obj1[key],
        });
      } else {
        result.push({
          key,
          status: 'removed',
          value: obj1[key],
        });
        result.push({
          key,
          status: 'added',
          value: obj2[key],
        });
      }
    }
  });

  if (result.every((item) => item.status === 'same')) {
    return false;
  }

  return result.sort((item1, item2) => {
    if (item1.key < item2.key) {
      return -1;
    }
    if (item1.key > item2.key) {
      return 1;
    }
    return 0;
  });
};

const compare = (val1, val2) => {
  return comparePlain(val1, val2);
};

export default compare;
