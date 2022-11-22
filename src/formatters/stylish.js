import extraTypeOf from '../utils/extraTypeOf.js';
import calcSpaces from '../utils/calcSpaces.js';

const stylish = (tree) => tree.children.map((item) => {
  if (item.type === 'tree') {
    return `${item.key}:  ${stylish(item.children)}`
  }

  if (item.type === 'leaf') {
    if (item.status === 'added') {
      return `+ ${item.key}: ${JSON.stringify(item.value)}`;
    }

    if (item.status === 'removed') {
      return `- ${item.key}: ${JSON.stringify(item.value)}`;
    }

    if (item.status === 'updated') {
      return `- ${item.key}: ${JSON.stringify(item.prevValue)} \n + ${item.key}: ${JSON.stringify(item.newValue)}`;
    }

    if (item.status === 'same') {
      return `${item.key}: ${JSON.stringify(item.value)}`;
    }
  }
});

export default stylish;
