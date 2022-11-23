// import compare from '../src/utils/compare.js';
// import { sort } from '../src/utils/sort.js';
// import selectFormatter from '../src/formatters/index.js';

// const json1 = {
//   host: 'hexlet.io',
//   timeout: 50,
//   proxy: '123.234.53.22',
//   follow: false,
// };
// const json2 = {
//   timeout: 20,
//   verbose: 'true',
//   host: 'hexlet.io',
// };

// let flatDiffStructure = null;

// beforeEach(() => {
//   flatDiffStructure = compare(json1, json2);
//   flatDiffStructure = sort(flatDiffStructure);
// });

// test('plain flat values', () => {
//   const formatter = selectFormatter('plain');
//   const shouldBe = "Property 'follow' was removed\nProperty 'proxy' was removed\nProperty 'timeout' was updated. From 50 to 20\nProperty 'verbose' was added with value: 'true'\n";

//   expect(formatter(flatDiffStructure)).toEqual(shouldBe);
// });
