import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

const parseFile = (filePath) => {
  const extension = path.parse(filePath).ext;

  switch (extension) {
    case '.json':
      return JSON.parse(readFileSync(filePath, 'utf8'));

    case '.yml':
    case '.yaml':
      return yaml.load(readFileSync(filePath, 'utf8'));

    default:
      break;
  }

  return undefined;
};

export default parseFile;
