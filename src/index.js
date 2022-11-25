import generateDiffTree from './utils/generateDiffTree.js';
import parseFile from './parsers.js';
import selectFormatter from './formatters/index.js';

const genDiff = (path1, path2, format) => {
  const diffStructure = generateDiffTree(parseFile(path1), parseFile(path2));
  const formatter = selectFormatter(format);
  return formatter(diffStructure);
};

export default genDiff;
