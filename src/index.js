import path from 'node:path';
import { readFileSync } from 'node:fs';
import generateDiffTree from './utils/generateDiffTree.js';
import parseFile from './parsers.js';
import getFormattedResult from './formatters/index.js';

const genDiff = (path1, path2, format) => {
  const file1 = readFileSync(path1, 'utf8');
  const file2 = readFileSync(path2, 'utf8');
  const extension1 = path.parse(path1).ext;
  const extension2 = path.parse(path2).ext;

  const diffStructure = generateDiffTree(
    parseFile(file1, extension1),
    parseFile(file2, extension2),
  );
  return getFormattedResult(diffStructure, format);
};

export default genDiff;
