import stylish from './stylish.js';
import plain from './plain.js';

const formattersMap = {
  stylish,
  plain,
};

const selectFormatter = (format) => formattersMap[format];

export default selectFormatter;
