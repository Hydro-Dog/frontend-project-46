import sortByKeys from '../src/utils/sort.js';

test('sort flat object', () => {
  const array = [
    { sign: '', key: 'host', value: 'hexlet.io' },
    { sign: '-', key: 'timeout', value: 50 },
    { sign: '+', key: 'timeout', value: 20 },
    { sign: '-', key: 'proxy', value: '123.234.53.22' },
    { sign: '-', key: 'follow', value: false },
    { sign: '+', key: 'verbose', value: 'true' },
  ];
  expect(sortByKeys(array)).toEqual([
    { sign: '-', key: 'follow', value: false },
    { sign: '', key: 'host', value: 'hexlet.io' },
    { sign: '-', key: 'proxy', value: '123.234.53.22' },
    { sign: '-', key: 'timeout', value: 50 },
    { sign: '+', key: 'timeout', value: 20 },
    { sign: '+', key: 'verbose', value: 'true' },
  ]);
});

test('sort nested object', () => {
  const array = [
    { sign: '', key: 'host', value: 'hexlet.io' },
    { sign: '-', key: 'timeout', value: 50 },
    { sign: '+', key: 'timeout', value: 20 },
    { sign: '-', key: 'proxy', value: '123.234.53.22' },
    { sign: '-', key: 'follow', value: false },
    {
      sign: '+',
      key: 'verbose',
      value: [{ sign: '-', key: 'timeout', value: 50 },
        { sign: '+', key: 'timeout', value: 20 },
        { sign: '-', key: 'proxy', value: '123.234.53.22' },
        { sign: '-', key: 'follow', value: false }],
    },
  ];
  expect(sortByKeys(array)).toEqual([
    { key: 'follow', sign: '-', value: false },
    { key: 'host', sign: '', value: 'hexlet.io' },
    { key: 'proxy', sign: '-', value: '123.234.53.22' },
    { key: 'timeout', sign: '-', value: 50 },
    { key: 'timeout', sign: '+', value: 20 },
    {
      key: 'verbose',
      sign: '+',
      value: [
        { key: 'follow', sign: '-', value: false },
        { key: 'proxy', sign: '-', value: '123.234.53.22' },
        { key: 'timeout', sign: '-', value: 50 },
        { key: 'timeout', sign: '+', value: 20 },
      ],
    }]);
});
