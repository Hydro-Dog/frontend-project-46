import extraTypeOf from '../utils/extraTypeOf.js';
import calcSpaces from '../utils/calcSpaces.js';

const getString = {
  getLeftSpaces: (spaces) => calcSpaces(spaces),
  getSign: (sign) => (sign ? `${sign} ` : '  '),
  getKey: (key) => `${key}: `,
  getPrimitiveValue: (value, arr, index, spaces) => `${value}${index === arr.length - 1 ? `${calcSpaces(spaces - 2)}` : ''} \n`,
  getObjectValue: (cb, value, spaces) => `{\n${cb(value, spaces + 4).join('')}${calcSpaces(spaces + 4)}}\n`,
};

const prepareData = (data, spaces) => data.map(({ sign, key, value }, index, arr) => {
  const leftSpacesSymbol = getString.getLeftSpaces(spaces);
  const signSymbol = getString.getSign(sign);
  const keySymbol = getString.getKey(key);

  const valueSymbol = extraTypeOf(value) === 'array'
    ? getString.getObjectValue(prepareData, value, spaces)
    : getString.getPrimitiveValue(value, arr, index, spaces);

  return `  ${leftSpacesSymbol}${signSymbol}${keySymbol}${valueSymbol}`;
});

const stylish = (data) => `{\n${prepareData(data, 0).join('').slice(0, -1)}\n}`;

export default stylish;
