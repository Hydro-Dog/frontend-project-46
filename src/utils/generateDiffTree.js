import extraTypeOf from './extraTypeOf.js';

const generateDiffTree = (obj1, obj2, key = null) => {
  const keysSet = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  const keys = Array.from(keysSet);

  const result = [];

  keys.forEach((item) => {
    if (extraTypeOf(obj1[item]) === 'object' && extraTypeOf(obj2[item]) === 'object') {
      const treeResult = generateDiffTree(obj1[item], obj2[item], item);
      result.push(treeResult);
    } else if (obj1[item] === obj2[item] && obj1[item] !== undefined && obj2[item] !== undefined) {
      result.push({
        key: item,
        status: 'same',
        value: obj1[item],
        type: 'leaf',
      });
    } else if (obj1[item] !== obj2[item] && obj1[item] !== undefined && obj2[item] !== undefined) {
      result.push({
        key: item,
        status: 'updated',
        prevValue: obj1[item],
        newValue: obj2[item],
        type: 'leaf',
      });
    } else if (obj1[item] === undefined) {
      result.push({
        key: item,
        status: 'added',
        value: obj2[item],
        type: 'leaf',
      });
    } else if (obj2[item] === undefined) {
      result.push({
        key: item,
        status: 'removed',
        value: obj1[item],
        type: 'leaf',
      });
    }
  });

  return {
    key,
    type: 'tree',
    status: 'same',
    children: result.sort((item1, item2) => {
      if (item1.key < item2.key) {
        return -1;
      }
      if (item1.key > item2.key) {
        return 1;
      }
      return 0;
    }),
  };
};

export default generateDiffTree;
