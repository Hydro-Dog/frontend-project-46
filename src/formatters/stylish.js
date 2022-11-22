import extraTypeOf from '../utils/extraTypeOf.js';
import calcSpaces from '../utils/calcSpaces.js';


const getSpaces = (length) => Array.from({ length }, () => '=').join('');

const prettifyValue = (value, spaces = 0) => {
  if (extraTypeOf(value) === 'object') {
    return Object.entries(value).map(([key, val]) => `\n    ${key}: ${val}\n`).join('');
  }
  return value;
};

const stylish = (tree, spaces = 0) => tree.children.map((item) => {
  if (item.type === 'tree') {
    return `${item.key}: \n${stylish(item)}`;
  }

  if (item.type === 'leaf') {
    if (item.status === 'added') {
      return ` + ${item.key}: ${prettifyValue(item.value)} \n`;
    }

    if (item.status === 'removed') {
      return ` - ${item.key}: ${prettifyValue(item.value)} \n`;
    }

    if (item.status === 'updated') {
      return ` - ${item.key}: ${prettifyValue(item.prevValue)}\n + ${item.key}: ${prettifyValue(item.newValue)} \n`;
    }

    if (item.status === 'same') {
      return `   ${item.key}: ${prettifyValue(item.value)} \n`;
    }
  }
}).join('');

export default stylish;
