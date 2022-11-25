import generateDiffTree from '../src/utils/generateDiffTree.js';
import parseFile from '../src/parsers.js';

const RESULT_DIFF_TREE = {
  children: [{
    children: [{
      key: 'follow', status: 'added', type: 'leaf', value: false,
    }, {
      key: 'setting1', status: 'same', type: 'leaf', value: 'Value 1',
    }, {
      key: 'setting2', status: 'removed', type: 'leaf', value: 200,
    }, {
      key: 'setting3', newValue: null, prevValue: true, status: 'updated', type: 'leaf',
    }, {
      key: 'setting4', status: 'added', type: 'leaf', value: 'blah blah',
    }, {
      key: 'setting5', status: 'added', type: 'leaf', value: { key5: 'value5' },
    }, {
      children: [{
        children: [{
          key: 'wow', newValue: 'so much', prevValue: '', status: 'updated', type: 'leaf',
        }],
        key: 'doge',
        status: 'same',
        type: 'tree',
      }, {
        key: 'key', status: 'same', type: 'leaf', value: 'value',
      }, {
        key: 'ops', status: 'added', type: 'leaf', value: 'vops',
      }],
      key: 'setting6',
      status: 'same',
      type: 'tree',
    }],
    key: 'common',
    status: 'same',
    type: 'tree',
  }, {
    children: [{
      key: 'baz', newValue: 'bars', prevValue: 'bas', status: 'updated', type: 'leaf',
    }, {
      key: 'foo', status: 'same', type: 'leaf', value: 'bar',
    }, {
      key: 'nest', newValue: 'str', prevValue: { key: 'value' }, status: 'updated', type: 'leaf',
    }],
    key: 'group1',
    status: 'same',
    type: 'tree',
  },
  {
    key: 'group2', status: 'removed', type: 'leaf', value: { abc: 12345, deep: { id: 45 } },
  }, {
    key: 'group3', status: 'added', type: 'leaf', value: { deep: { id: { number: 45 } }, fee: 100500 },
  },
  {
    children: [{
      key: 'abc', status: 'same', type: 'leaf', value: 12345,
    }, {
      children: [{
        key: 'id', status: 'same', type: 'leaf', value: 45,
      }],
      key: 'deep',
      status: 'same',
      type: 'tree',
    }],
    key: 'group5',
    status: 'same',
    type: 'tree',
  }],
  key: null,
  status: 'same',
  type: 'tree',
};

const DEEP_FILE_JSON_1 = '__fixtures__/file1deep.json';
const DEEP_FILE_JSON_2 = '__fixtures__/file2deep.json';

test('parse json', () => {
  expect(
    generateDiffTree(parseFile(DEEP_FILE_JSON_1), parseFile(DEEP_FILE_JSON_2)),
  ).toEqual(RESULT_DIFF_TREE);
});
