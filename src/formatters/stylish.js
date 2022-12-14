/* eslint-disable no-shadow */
import _ from 'lodash';

const getSpaces = (depth, ch = '') => {
  const spaces = ' '.repeat(depth * 4);
  if (ch === 'ADDED') {
    return `${spaces.slice(0, -2)}+ `;
  }

  if (ch === 'REMOVED') {
    return `${spaces.slice(0, -2)}- `;
  }

  if (!ch) {
    return spaces;
  }

  return null;
};

const getCloseBracket = (depth, isRoot) => `${getSpaces(depth)}}${isRoot ? '' : '\n'}`;

const prettifyValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    return `{\n${Object.entries(value).map(([key, value]) => `${getSpaces(depth)}${key}: ${prettifyValue(value, depth + 1)}\n`).join('')}${getSpaces(depth - 1)}}`;
  }
  return value;
};

const getStylishOutput = (tree, depth) => tree.children.map((item) => {
  if (item.status === 'tree') {
    return `${getSpaces(depth)}${item.key}: {\n${getStylishOutput(item, depth + 1)}${getCloseBracket(depth)}`;
  }
  if (item.status === 'added') {
    return `${getSpaces(depth, 'ADDED')}${item.key}: ${prettifyValue(item.value, depth + 1, true)}\n`;
  }

  if (item.status === 'removed') {
    return `${getSpaces(depth, 'REMOVED')}${item.key}: ${prettifyValue(item.value, depth + 1, true)}\n`;
  }

  if (item.status === 'updated') {
    const removedProp = `${getSpaces(depth, 'REMOVED')}${item.key}: ${prettifyValue(item.prevValue, depth + 1, true)}\n`;
    const addedPrp = `${getSpaces(depth, 'ADDED')}${item.key}: ${prettifyValue(item.newValue, depth + 1, true)}\n`;
    return removedProp + addedPrp;
  }

  if (item.status === 'same') {
    return `${getSpaces(depth)}${item.key}: ${prettifyValue(item.value, depth + 1, true)}\n`;
  }

  return null;
}).join('');

const stylish = (tree) => `{\n${getStylishOutput(tree, 1)}}`;

export default stylish;
