import extraTypeOf from '../utils/extraTypeOf.js';

const complexValueHandler = (value) => {
  if (extraTypeOf(value) === 'object') {
    return '[complex value]';
  }
  return value;
};

const getPath = (key, path) => (path ? `${path}.${key}` : `${key}`);

const plain = (tree, path = '') => tree.children.map((item) => {
  if (item.type === 'tree') {
    return `${plain(item, getPath(item.key, path))}`;
  }

  if (item.type === 'leaf') {
    if (item.status === 'added') {
      return `Property '${getPath(item.key, path)}' was added with value: ${complexValueHandler(item.value)}\n`;
    }

    if (item.status === 'removed') {
      return `Property '${getPath(item.key, path)}' was removed\n`;
    }

    if (item.status === 'updated') {
      return `Property '${getPath(item.key, path)}' was updated. From ${complexValueHandler(item.prevValue) === '' ? '\'\'' : complexValueHandler(item.prevValue)} to ${complexValueHandler(item.newValue) === '' ? '\'\'' : complexValueHandler(item.newValue)}\n`;
    }
  }
  return null;
}).join('');

export default plain;
