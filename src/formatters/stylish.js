import _ from 'lodash';

const getSpaces = (depth) => Array.from({ length: depth * 2 }, () => ' ').join('');

const prettifyValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    return `{${Object.entries(value).map(([key, val]) => `\n${getSpaces(depth + 1)}${key}: ${prettifyValue(val, depth + 2)}`).join('')}\n${getSpaces(depth - 1)}}`;
  }
  return value;
};

const getStylishOutput = (tree, depth) => tree.children.map((item) => {
  if (item.status === 'tree') {
    return `  ${getSpaces(depth)}${item.key}: {\n${getStylishOutput(item, depth + 2)}${getSpaces(depth + 1)}}\n`;
  }
  if (item.status === 'added') {
    return `${getSpaces(depth)}+ ${item.key}: ${prettifyValue(item.value, depth + 2)}\n`;
  }

  if (item.status === 'removed') {
    return `${getSpaces(depth)}- ${item.key}: ${prettifyValue(item.value, depth + 2)}\n`;
  }

  if (item.status === 'updated') {
    return `${getSpaces(depth)}- ${item.key}: ${prettifyValue(item.prevValue, depth + 2)}\n${getSpaces(depth)}+ ${item.key}: ${prettifyValue(item.newValue, depth + 2)}\n`;
  }

  if (item.status === 'same') {
    return `${getSpaces(depth)}  ${item.key}: ${prettifyValue(item.value, depth + 2)}\n`;
  }

  return null;
}).join('');

const stylish = (tree) => `{\n${getStylishOutput(tree, 1)}}`;

export default stylish;
