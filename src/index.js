import path from 'node:path';
import { readFileSync } from 'node:fs';
import generateDiffTree from './utils/generateDiffTree.js';
import parseFile from './parsers.js';
import getFormattedResult from './formatters/index.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const file1 = readFileSync(path1, 'utf8');
  const file2 = readFileSync(path2, 'utf8');
  const file1Format = path.parse(path1).ext.substring(1);
  const file2Format = path.parse(path2).ext.substring(1);

  const diffStructure = generateDiffTree(
    parseFile(file1, file1Format),
    parseFile(file2, file2Format),
  );
  return getFormattedResult(diffStructure, format);
};

export default genDiff;
