import stylish from './stylish.js';
import toPlain from './plain.js';
import toJson from './toJson.js';

const formattersMap = {
  stylish,
  plain: toPlain,
  json: toJson,
};

const selectFormatter = (format) => formattersMap[format];

export default selectFormatter;
