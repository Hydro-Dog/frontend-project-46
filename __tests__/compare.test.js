import compare from '../src/utils/compare.js';

const json1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const json2 = {
  timeout: 20,
  verbose: 'true',
  host: 'hexlet.io',
};
const json3 = {
  value1: {
    value11: 'Value 1',
  },
  value2: { value22: 'Value 2' },
  value3: {
    value33: { value333: 'Value 3' },
  },
  value4: {
    value44: { value444: 'Value 4' },
  },
};
const json4 = {
  value1: {
    value11: 'Value 1',
  },
  value2: {
    value22: { value222: 'Value 2' },
  },
  value3: { value33: 'Value 3' },
  value5: {
    value55: { value555: 'Value 5' },
  },
};

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
  expect(compare(json3, json4)).toEqual([
    {
      key: 'value1',
      sign: '',
      value: [
        { key: 'value11', sign: '', value: 'Value 1' },
      ],
    },
    {
      key: 'value2',
      sign: '',
      value: [
        { key: 'value22', sign: '-', value: 'Value 2' },
        {
          key: 'value22',
          sign: '+',
          value: [
            { key: 'value222', sign: '', value: 'Value 2' },
          ],
        },
      ],
    },
    {
      key: 'value3',
      sign: '',
      value: [
        {
          key: 'value33',
          sign: '-',
          value: [
            { key: 'value333', sign: '', value: 'Value 3' },
          ],
        },
        { key: 'value33', sign: '+', value: 'Value 3' }],
    },
    {
      key: 'value4',
      sign: '-',
      value: [
        {
          key: 'value44',
          sign: '',
          value: [
            { key: 'value444', sign: '', value: 'Value 4' },
          ],
        },
      ],
    },
    {
      key: 'value5',
      sign: '+',
      value: [
        {
          key: 'value55',
          sign: '',
          value: [
            { key: 'value555', sign: '', value: 'Value 5' }],
        }],
    }]);
});
