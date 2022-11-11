import compare from '../src/utils/compare.js';
import { sort } from '../src/utils/sort.js';
import selectFormatter from '../src/formatters/index.js';

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

let flatDiffStructure = null;

beforeEach(() => {
  flatDiffStructure = compare(json1, json2);
  flatDiffStructure = sort(flatDiffStructure);
});

test('stylishflat values', () => {
  const formatter = selectFormatter('json');
  const shouldBe = '[{"sign":"-","key":"follow","value":false},{"sign":"","key":"host","value":"hexlet.io"},{"sign":"-","key":"proxy","value":"123.234.53.22"},{"sign":"-","key":"timeout","value":50},{"sign":"+","key":"timeout","value":20},{"sign":"+","key":"verbose","value":"true"}]';

  expect(formatter(flatDiffStructure)).toEqual(shouldBe);
});
