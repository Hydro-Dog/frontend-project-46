import path from 'node:path';
import { readFileSync } from 'node:fs';
import parseFile from '../src/parsers.js';

const DEEP_FILE_JSON_1 = '__fixtures__/file1.json';
const DEEP_FILE_YML_1 = '__fixtures__/file1.yml';

const RESULT_DEEP_FILE_PARSED = {
  common: {
    setting1: 'Value 1', setting2: 200, setting3: true, setting6: { doge: { wow: '' }, key: 'value' },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345, deep: { id: 45 } },
  group5: { abc: 12345, deep: { id: 45 } },
};

test.each([
  [DEEP_FILE_JSON_1, RESULT_DEEP_FILE_PARSED],
  [DEEP_FILE_YML_1, RESULT_DEEP_FILE_PARSED],
])('parse file(%i, %i)', (a, expected) => {
  const file = readFileSync(a, 'utf8');
  const extension = path.parse(a).ext;
  expect(parseFile(file, extension)).toEqual(expected);
});
