export const RESULT_STYLISH = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
    group5: {
        abc: 12345
        deep: {
            id: 45
        }
    }
}`;

export const RESULT_PLAIN = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

// eslint-disable-next-line no-useless-escape
export const RESULT_JSON = '{\"key\":null,\"status\":\"tree\",\"children\":[{\"key\":\"common\",\"status\":\"tree\",\"children\":[{\"key\":\"follow\",\"status\":\"added\",\"value\":false},{\"key\":\"setting1\",\"status\":\"same\",\"value\":\"Value 1\"},{\"key\":\"setting2\",\"status\":\"removed\",\"value\":200},{\"key\":\"setting3\",\"status\":\"updated\",\"prevValue\":true,\"newValue\":null},{\"key\":\"setting4\",\"status\":\"added\",\"value\":\"blah blah\"},{\"key\":\"setting5\",\"status\":\"added\",\"value\":{\"key5\":\"value5\"}},{\"key\":\"setting6\",\"status\":\"tree\",\"children\":[{\"key\":\"doge\",\"status\":\"tree\",\"children\":[{\"key\":\"wow\",\"status\":\"updated\",\"prevValue\":\"\",\"newValue\":\"so much\"}]},{\"key\":\"key\",\"status\":\"same\",\"value\":\"value\"},{\"key\":\"ops\",\"status\":\"added\",\"value\":\"vops\"}]}]},{\"key\":\"group1\",\"status\":\"tree\",\"children\":[{\"key\":\"baz\",\"status\":\"updated\",\"prevValue\":\"bas\",\"newValue\":\"bars\"},{\"key\":\"foo\",\"status\":\"same\",\"value\":\"bar\"},{\"key\":\"nest\",\"status\":\"updated\",\"prevValue\":{\"key\":\"value\"},\"newValue\":\"str\"}]},{\"key\":\"group2\",\"status\":\"removed\",\"value\":{\"abc\":12345,\"deep\":{\"id\":45}}},{\"key\":\"group3\",\"status\":\"added\",\"value\":{\"deep\":{\"id\":{\"number\":45}},\"fee\":100500}},{\"key\":\"group5\",\"status\":\"tree\",\"children\":[{\"key\":\"abc\",\"status\":\"same\",\"value\":12345},{\"key\":\"deep\",\"status\":\"tree\",\"children\":[{\"key\":\"id\",\"status\":\"same\",\"value\":45}]}]}]}';

export const DEEP_FILE_JSON_1 = '__fixtures__/file1.json';
export const DEEP_FILE_JSON_2 = '__fixtures__/file2.json';
