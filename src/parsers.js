import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

export const parseJson = (path) => {
  const file = readFileSync(path, 'utf8');
  return JSON.parse(file);
};

export const parseYaml = (path) => {
  const file = readFileSync(path, 'utf8');
  return yaml.load(file);
};
