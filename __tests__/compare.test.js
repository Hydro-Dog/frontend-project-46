import { readFile } from 'node:fs/promises';
import compare from '../src/utils/compare.js';

let json1 = null;
let json2 = null;
let json3 = null;
let json4 = null;

beforeEach(async () => {
  const [res1, res2, res3, res4] = await Promise.allSettled([
    readFile(`${__dirname}/../__fixtures__/file1.json`, { encoding: 'utf8' }),
    readFile(`${__dirname}/../__fixtures__/file2.json`, { encoding: 'utf8' }),
    readFile(`${__dirname}/../__fixtures__/file1deep.json`, { encoding: 'utf8' }),
    readFile(`${__dirname}/../__fixtures__/file2deep.json`, { encoding: 'utf8' }),
  ]);

  json1 = JSON.parse(res1.value);
  json2 = JSON.parse(res2.value);
  json3 = JSON.parse(res3.value);
  json4 = JSON.parse(res4.value);
});

test('compare flat values', () => {
  expect(compare(json1, json2)).toEqual([
    { key: 'host', sign: '', value: 'hexlet.io' },
    { key: 'timeout', sign: '-', value: 50 },
    { key: 'timeout', sign: '+', value: 20 },
    { key: 'proxy', sign: '-', value: '123.234.53.22' },
    { key: 'follow', sign: '-', value: false },
    { key: 'verbose', sign: '+', value: 'true' },
  ]);
});

test('compare same values', () => {
  expect(compare(json1, json1)).toEqual([
    { key: 'host', sign: '', value: 'hexlet.io' },
    { key: 'timeout', sign: '', value: 50 },
    { key: 'proxy', sign: '', value: '123.234.53.22' },
    { key: 'follow', sign: '', value: false },
  ]);
});

test('compare nested values', () => {
  expect(compare(json3, json4)).toEqual([{ key: 'common', sign: '', value: [{ key: 'setting1', sign: '', value: 'Value 1' }, { key: 'setting2', sign: '-', value: 200 }, { key: 'setting3', sign: '-', value: true }, { key: 'setting3', sign: '+', value: null }, { key: 'setting6', sign: '', value: [{ key: 'key', sign: '', value: 'value' }, { key: 'doge', sign: '', value: [{ key: 'wow', sign: '-', value: '' }, { key: 'wow', sign: '+', value: 'so much' }] }, { key: 'ops', sign: '+', value: 'vops' }] }, { key: 'follow', sign: '+', value: false }, { key: 'setting4', sign: '+', value: 'blah blah' }, { key: 'setting5', sign: '+', value: [{ key: 'key5', sign: '', value: 'value5' }] }] }, {
    key: 'group1',
    sign: '',
    value: [{ key: 'baz', sign: '-', value: 'bas' }, {
      key: 'baz',
      sign: '+',
      value: 'bars',
    }, { key: 'foo', sign: '', value: 'bar' }, {
      key: 'nest',
      sign: '-',
      value:
    [{ key: 'key', sign: '', value: 'value' }],
    }, { key: 'nest', sign: '+', value: 'str' }],
  }, { key: 'group2', sign: '-', value: [{ key: 'abc', sign: '', value: 12345 }, { key: 'deep', sign: '', value: [{ key: 'id', sign: '', value: 45 }] }] }, { key: 'group3', sign: '+', value: [{ key: 'deep', sign: '', value: [{ key: 'id', sign: '', value: [{ key: 'number', sign: '', value: 45 }] }] }, { key: 'fee', sign: '', value: 100500 }] }]);
});
