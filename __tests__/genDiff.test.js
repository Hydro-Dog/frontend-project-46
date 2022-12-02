import genDiff from '../src/index';
import {
  RESULT_STYLISH, RESULT_PLAIN, RESULT_JSON, DEEP_FILE_JSON_1, DEEP_FILE_JSON_2,
} from '../__fixtures__/tests-fixtures.js';

test('parse stylish', () => {
  expect(
    genDiff(DEEP_FILE_JSON_1, DEEP_FILE_JSON_2, 'stylish'),
  ).toEqual(RESULT_STYLISH);
});

test('parse plain', () => {
  expect(
    genDiff(DEEP_FILE_JSON_1, DEEP_FILE_JSON_2, 'plain'),
  ).toEqual(RESULT_PLAIN);
});

test('parse json', () => {
  expect(
    genDiff(DEEP_FILE_JSON_1, DEEP_FILE_JSON_2, 'json'),
  ).toEqual(RESULT_JSON);
});
