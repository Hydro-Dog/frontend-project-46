import sort from '../src/utils/sort.js';

test('sort array default', () => {
  const array = [['1', 1], ['23', 23], ['-1', -1], ['18', 18], ['18', 18], ['12', 12]];
  expect(sort(array)).toEqual([['-1', -1], ['1', 1], ['12', 12], ['18', 18], ['18', 18], ['23', 23]]);
});
