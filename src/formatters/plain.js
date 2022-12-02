import _ from 'lodash';

const complexValueHandler = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getPath = (key, path) => (path ? `${path}.${key}` : `${key}`);

const getPlainOutput = (tree, path) => tree.children.map((item) => {
  if (item.status === 'tree') {
    return `${getPlainOutput(item, getPath(item.key, path))}`;
  }
  if (item.status === 'added') {
    return `Property '${getPath(item.key, path)}' was added with value: ${complexValueHandler(item.value)}\n`;
  }

  if (item.status === 'removed') {
    return `Property '${getPath(item.key, path)}' was removed\n`;
  }

  if (item.status === 'updated') {
    return `Property '${getPath(item.key, path)}' was updated. From ${complexValueHandler(item.prevValue) === '' ? '\'\'' : complexValueHandler(item.prevValue)} to ${complexValueHandler(item.newValue) === '' ? '\'\'' : complexValueHandler(item.newValue)}\n`;
  }
  return null;
}).join('');

const plain = (tree, path = '') => getPlainOutput(tree, path).replace(/(\n)$/, '');

export default plain;
