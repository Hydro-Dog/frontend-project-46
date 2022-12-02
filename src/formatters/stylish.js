import _ from 'lodash';

const getSpaces = (depth, ch = '') => {
  if (ch === 'ADDED') {
    const spaces = Array.from({ length: depth * 4 }, () => ' ');
    return spaces.map((item, index, array) => (index === array.length - 2 ? '+' : item)).join('');
  }

  if (ch === 'REMOVED') {
    const spaces = Array.from({ length: depth * 4 }, () => ' ');
    return spaces.map((item, index, array) => (index === array.length - 2 ? '-' : item)).join('');
  }

  if (!ch) {
    return Array.from({ length: depth * 4 }, () => ' ').join('');
  }

  return null;
};

const getCloseBracket = (depth) => `${getSpaces(depth)}}\n`;

const prettifyValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    // eslint-disable-next-line no-shadow
    return `${Object.entries(value).map(([key, value]) => `\n${getSpaces(depth)}${key}: ${(_.isPlainObject(value) ? `{${prettifyValue(value, depth + 1)}\n${getSpaces(depth)}}` : value)}`).join('')}`;
  }
  return value;
};

const getStylishOutput = (tree, depth) => tree.children.map((item) => {
  if (item.status === 'tree') {
    return `${getSpaces(depth)}${item.key}: {\n${getStylishOutput(item, depth + 1)}${getCloseBracket(depth)}`;
  }
  if (item.status === 'added') {
    if (_.isPlainObject(item.value)) {
      return `${getSpaces(depth, 'ADDED')}${item.key}: {${prettifyValue(item.value, depth + 1)}\n${getCloseBracket(depth)}`;
    }
    return `${getSpaces(depth, 'ADDED')}${item.key}: ${prettifyValue(item.value, depth + 1)}\n`;
  }

  if (item.status === 'removed') {
    if (_.isPlainObject(item.value)) {
      return `${getSpaces(depth, 'REMOVED')}${item.key}: {${prettifyValue(item.value, depth + 1)}\n${getCloseBracket(depth)}`;
    }
    return `${getSpaces(depth, 'REMOVED')}${item.key}: ${prettifyValue(item.value, depth + 1)}\n`;
  }

  if (item.status === 'updated') {
    const removedProp = _.isPlainObject(item.prevValue) ? `${getSpaces(depth, 'REMOVED')}${item.key}: {${prettifyValue(item.prevValue, depth + 1)}\n${getCloseBracket(depth)}` : `${getSpaces(depth, 'REMOVED')}${item.key}: ${prettifyValue(item.prevValue, depth + 1)}\n`;
    const addedPrp = _.isPlainObject(item.newValue) ? `${getSpaces(depth, 'ADDED')}${item.key}: {${prettifyValue(item.newValue, depth + 1)}\n${getCloseBracket(depth)}` : `${getSpaces(depth, 'ADDED')}${item.key}: ${prettifyValue(item.newValue, depth + 1)}\n`;
    return removedProp + addedPrp;
  }

  if (item.status === 'same') {
    if (_.isPlainObject(item.value)) {
      return `${getSpaces(depth)}${item.key}: {${prettifyValue(item.value, depth + 1)}\n${getCloseBracket(depth)}`;
    }
    return `${getSpaces(depth)}${item.key}: ${prettifyValue(item.value, depth + 1)}\n`;
  }

  return null;
}).join('');

const stylish = (tree) => `{\n${getStylishOutput(tree, 1)}}`;

export default stylish;
