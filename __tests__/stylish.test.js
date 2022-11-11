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
  const formatter = selectFormatter('stylish');
  const shouldBe = '{\n  - follow: false \n    host: hexlet.io \n  - proxy: 123.234.53.22 \n  - timeout: 50 \n  + timeout: 20 \n  + verbose: true \n}';

  expect(formatter(flatDiffStructure)).toEqual(shouldBe);
});
