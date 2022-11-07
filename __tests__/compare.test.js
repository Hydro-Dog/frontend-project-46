import { readFile } from 'node:fs/promises';
import compare from '../src/utils/compare.js';

let json1 = null;
let json2 = null;

beforeEach(async () => {
  const [res1, res2] = await Promise.allSettled([
    readFile(`${__dirname}/../file1.json`, { encoding: 'utf8' }),
    readFile(`${__dirname}/../file2.json`, { encoding: 'utf8' }),
  ]);

  json1 = JSON.parse(res1.value);
  json2 = JSON.parse(res2.value);
});

test('compare different files', () => {
  expect(compare(json1, json2)).toEqual([
    ['', 'host', 'hexlet.io'],
    ['-', 'timeout', 50],
    ['+', 'timeout', 20],
    ['-', 'proxy', '123.234.53.22'],
    ['-', 'follow', false],
    ['+', 'verbose', 'true'],
  ]);
});

test('compare same files, check output structure', () => {
  expect(compare(json1, json1)).toEqual([
    ['', 'host', 'hexlet.io'],
    ['', 'timeout', 50],
    ['', 'proxy', '123.234.53.22'],
    ['', 'follow', false],
  ]);
});
