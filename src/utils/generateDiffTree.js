import _ from 'lodash';

const generateDiffTree = (obj1, obj2, key = null) => {
  const unsortedKeys = _.uniqBy([...Object.keys(obj1), ...Object.keys(obj2)], (item) => item);
  const sortedKeys = _.sortBy(unsortedKeys, [(item) => item]);
  const result = sortedKeys.map((item) => {
    if (_.isPlainObject(obj1[item]) && _.isPlainObject(obj2[item])) {
      return generateDiffTree(obj1[item], obj2[item], item);
    }

    if (!Object.hasOwn(obj1, item)) {
      return {
        key: item,
        status: 'added',
        value: obj2[item],
      };
    }

    if (!Object.hasOwn(obj2, item)) {
      return {
        key: item,
        status: 'removed',
        value: obj1[item],
      };
    }

    if (obj1[item] === obj2[item]) {
      return {
        key: item,
        status: 'same',
        value: obj1[item],
      };
    }

    if (obj1[item] !== obj2[item]) {
      return {
        key: item,
        status: 'updated',
        prevValue: obj1[item],
        newValue: obj2[item],
      };
    }

    return null;
  });

  return {
    key,
    status: 'tree',
    children: result,
  };
};

export default generateDiffTree;
