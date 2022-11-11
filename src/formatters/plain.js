import { sortByKeys } from '../utils/sort.js';
import extraTypeOf from '../utils/extraTypeOf.js';

const prepareValueString = (value) => `${extraTypeOf(value) === 'string' ? `'${value}'` : value}`;

const propertyRemoved = (name) => `Property '${name}' was removed`;
const propertyAdded = (name, newValue) => `Property '${name}' was added with value: ${prepareValueString(newValue)}`;
const propertyUpdated = (name, oldValue, newValue) => `Property '${name}' was updated. From ${prepareValueString(oldValue)} to ${prepareValueString(newValue)}`;

const complexValueWrapper = (value) => (extraTypeOf(value) === 'array' ? '[complex value]' : value);

const getKeyName = (parentKey, key) => `${parentKey ? `${parentKey}.` : ''}${key}`;

const getDiffs = (rawValue, startKey) => {
  const answer = [];

  const prepareData = (data, parentKey) => {
    const diffs = data.flatMap(({ sign, key, value }, index, arr) => {
      let result = null;
      if (!sign && extraTypeOf(value) === 'array') {
        prepareData(value, `${getKeyName(parentKey, key)}`);
      } else if (sign === '+') {
        result = {
          key:
            `${getKeyName(parentKey, key)}`,
          value: propertyAdded(`${getKeyName(parentKey, key)}`, complexValueWrapper(value)),
        };
      } else if (sign === '-') {
        if (arr[index].key === arr[index + 1].key) {
          result = {
            key: `${getKeyName(parentKey, key)}`,
            value: propertyUpdated(
              `${getKeyName(parentKey, key)}`,
              complexValueWrapper(arr[index].value),
              complexValueWrapper(arr[index + 1].value),
            ),
          };
          arr.splice(index + 1, 1);
        } else {
          result = {
            key: `${getKeyName(parentKey, key)}`,
            value: propertyRemoved(`${getKeyName(parentKey, key)}`),
          };
        }
      }

      return result;
    });

    answer.push(diffs);
  };

  prepareData(rawValue, startKey);

  const resultDiffs = answer.flatMap((item) => item).filter(Boolean);
  return sortByKeys(resultDiffs);
};

const getStringOutput = (diffs) => diffs.map((item) => `${item.value}\n`).join('');

const plain = (data) => {
  const diffs = getDiffs(data, '');
  return getStringOutput(diffs);
};

export default plain;
