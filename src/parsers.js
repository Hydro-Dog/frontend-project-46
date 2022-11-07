import { readFile } from 'node:fs/promises';
import yaml from 'js-yaml';

export const parseJson = async (path) => {
  const file = await readFile(path, 'utf8');
  return JSON.parse(file);
};

export const parseYaml = async (path) => {
  const file = await readFile(path, 'utf8');
  return yaml.load(file);
};
