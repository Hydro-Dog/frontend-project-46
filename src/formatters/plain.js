import { InvalidOptionArgumentError } from 'commander';
import extraTypeOf from '../utils/extraTypeOf.js';

const propertyRemoved = (name) => `Property '${name}' was removed`;
const propertyAdded = (name, newValue) => `Property '${name}' was added with value: ${newValue}`;
const propertyUpdated = (name, oldValue, newValue) => `Property '${name}' was updated. From ${oldValue} to ${newValue}`;

const foo = (data, parentKey) => {
  const answer = [];

  const prepareData = (data, parentKey) => {
    const a = data.flatMap(({ sign, key, value }, index, arr) => {
      const result = [];
      if (!sign && extraTypeOf(value) === 'array') {
        prepareData(value, `${parentKey}.${key}`);
      } else if (sign === '+') {
        result.push(propertyAdded(`${parentKey}.${key}`, extraTypeOf(value) === 'array' ? '[complex value]' : value));
      } else if (sign === '-') {
        if (arr[index].key === arr[index + 1].key) {
          result.push(propertyUpdated(`${parentKey}.${key}`, extraTypeOf(arr[index].value) === 'array' ? '[complex value]' : arr[index].value, extraTypeOf(arr[index + 1].value) === 'array' ? '[complex value]' : arr[index + 1].value));
          arr.splice(index + 1, 1);
        } else {
          result.push(propertyRemoved(`${parentKey}.${key}`));
        }
      }

      return result;
    });

    answer.push(a);
    return a;
  };

  prepareData(data, parentKey)

  console.log('answer: ', answer.flatMap(item => item));
};

const plain = (data) => foo(data, '');

export default plain;
