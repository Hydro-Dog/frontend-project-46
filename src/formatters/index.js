import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './toJson.js';

const formattersMap = {
  stylish,
  plain,
  json: toJson,
};

const selectFormatter = (format) => formattersMap[format];

export default selectFormatter;
