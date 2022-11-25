import _ from 'lodash';
import extraTypeOf from './extraTypeOf.js';

const generateDiffTree = (obj1, obj2, key = null) => {
  const unsortedKeys = _.uniqBy([...Object.keys(obj1), ...Object.keys(obj2)], (item) => item);
  const sortedKeys = _.sortBy(unsortedKeys, [(item) => item]);
  const result = sortedKeys.map((item) => {
    if (extraTypeOf(obj1[item]) === 'object' && extraTypeOf(obj2[item]) === 'object') {
      return generateDiffTree(obj1[item], obj2[item], item);
    } if (obj1[item] === obj2[item] && obj1[item] !== undefined && obj2[item] !== undefined) {
      return {
        key: item,
        status: 'same',
        value: obj1[item],
        type: 'leaf',
      };
    } if (obj1[item] !== obj2[item] && obj1[item] !== undefined && obj2[item] !== undefined) {
      return {
        key: item,
        status: 'updated',
        prevValue: obj1[item],
        newValue: obj2[item],
        type: 'leaf',
      };
    } if (obj1[item] === undefined) {
      return {
        key: item,
        status: 'added',
        value: obj2[item],
        type: 'leaf',
      };
    } if (obj2[item] === undefined) {
      return {
        key: item,
        status: 'removed',
        value: obj1[item],
        type: 'leaf',
      };
    }

    return null;
  });

  return {
    key,
    type: 'tree',
    status: 'same',
    children: result,
  };
};

export default generateDiffTree;
