import extraTypeOf from '../utils/extraTypeOf.js';

const getSpaces = (length) => Array.from({ length }, () => ' ').join('');

const prettifyValue = (value, spaces = 0) => {
  if (extraTypeOf(value) === 'object') {
    return `{${Object.entries(value).map(([key, val]) => `\n${getSpaces(spaces + 2)}${key}: ${prettifyValue(val, spaces + 4)}`).join('')}\n${getSpaces(spaces - 2)}}`;
  }
  return value;
};

const getChildren = (tree, spaces = 0) => tree.children.map((item) => {
  if (item.type === 'tree') {
    return `  ${getSpaces(spaces)}${item.key}: {\n${getChildren(item, spaces + 4)}${getSpaces(spaces + 2)}}\n`;
  }

  if (item.type === 'leaf') {
    if (item.status === 'added') {
      return `${getSpaces(spaces)}+ ${item.key}: ${prettifyValue(item.value, spaces + 4)}\n`;
    }

    if (item.status === 'removed') {
      return `${getSpaces(spaces)}- ${item.key}: ${prettifyValue(item.value, spaces + 4)}\n`;
    }

    if (item.status === 'updated') {
      return `${getSpaces(spaces)}- ${item.key}: ${prettifyValue(item.prevValue, spaces + 4)}\n${getSpaces(spaces)}+ ${item.key}: ${prettifyValue(item.newValue, spaces + 4)}\n`;
    }

    if (item.status === 'same') {
      return `${getSpaces(spaces)}  ${item.key}: ${prettifyValue(item.value, spaces + 4)}\n`;
    }
  }
  return null;
}).join('');

const stylish = (tree) => `{\n${getChildren(tree, 2)}}`;

export default stylish;
