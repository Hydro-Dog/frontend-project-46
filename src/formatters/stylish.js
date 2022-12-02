import _ from 'lodash';

const getSpaces = (depth) => Array.from({ length: depth }, () => ' ').join('');

const prettifyValue = (value, depth = 0) => {
  if (_.isPlainObject(value)) {
    return `{${Object.entries(value).map(([key, val]) => `\n${getSpaces(depth + 2)}${key}: ${prettifyValue(val, depth + 4)}`).join('')}\n${getSpaces(depth - 2)}}`;
  }
  return value;
};

const getChildren = (tree, depth = 0) => tree.children.map((item) => {
  if (item.status === 'tree') {
    return `  ${getSpaces(depth)}${item.key}: {\n${getChildren(item, depth + 4)}${getSpaces(depth + 2)}}\n`;
  }
  if (item.status === 'added') {
    return `${getSpaces(depth)}+ ${item.key}: ${prettifyValue(item.value, depth + 4)}\n`;
  }

  if (item.status === 'removed') {
    return `${getSpaces(depth)}- ${item.key}: ${prettifyValue(item.value, depth + 4)}\n`;
  }

  if (item.status === 'updated') {
    return `${getSpaces(depth)}- ${item.key}: ${prettifyValue(item.prevValue, depth + 4)}\n${getSpaces(depth)}+ ${item.key}: ${prettifyValue(item.newValue, depth + 4)}\n`;
  }

  if (item.status === 'same') {
    return `${getSpaces(depth)}  ${item.key}: ${prettifyValue(item.value, depth + 4)}\n`;
  }

  return null;
}).join('');

const stylish = (tree) => `{\n${getChildren(tree, 2)}}`;

export default stylish;
