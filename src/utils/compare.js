const extraTypeOf = function (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

const transform = (value) => {
  const keys = Object.keys(value);
  const result = [];
  console.log('value: ', value)
  keys.forEach((key) => {
    result.push({ sign: '', key, value: extraTypeOf(value[key]) === 'object' ? transform(value[key]) : value[key] });
  });

  return result
};

const compare = (val1, val2) => {
  const keysSet = new Set([...Object.keys(val1), ...Object.keys(val2)]);
  const keys = Array.from(keysSet);
  const result = [];
  const result2 = [];

  keys.forEach((key) => {
    if (val1[key] === val2[key]) {

      // result.push(['', key, val1[key]]);
      result2.push({ sign: '', key, value: val1[key] });

    } else if (val1[key] === undefined && (val2[key] || val2[key] === false || val2[key] === null || val2[key] === 0)) {

      console.log('key: ', key);
      // result.push(['+', key, extraTypeOf(val2[key]) === 'object' ? transform(val2[key]) : val2[key]]);
      result2.push({ sign: '+', key, value: transform(val2[key]) });

    } else if ((val1[key] || val1[key] === false) && val2[key] === undefined) {

      // result.push(['+', key, extraTypeOf(val2[key]) === 'object' ? transform(val2[key]) : val2[key]]);
      // result2.push({ sign: '+', key, value: extraTypeOf(val2[key]) === 'object' ? transform(val2[key]) : val2[key] });

      // result.push(['-', key, extraTypeOf(val2[key]) === 'object' ? transform(val1[key]) : val1[key]]);
      result2.push({ sign: '+', key, value: transform(val1[key]) });

    } else if (val1[key] !== val2[key]) {

      if (extraTypeOf(val1[key]) === 'object' && extraTypeOf(val2[key]) === 'object') {
        // result.push(['', key, compare(val1[key], val2[key])]);
        result2.push({ sign: '', key, value: compare(val1[key], val2[key]) });
      } else if (extraTypeOf(val1[key]) === 'object' && extraTypeOf(val2[key]) !== 'object') {
        // result.push(['-', key, transform(val1[key])]);
        // result.push(['+', key, val2[key]]);

        result2.push({ sign: '-', key, value: transform(val1[key]) });
        result2.push({ sign: '+', key, value: val2[key] });
      } else if (extraTypeOf(val1[key]) !== 'object' && extraTypeOf(val2[key]) === 'object') {
        // result.push(['-', key, val1[key]]);
        // result.push(['+', key, transform(val1[key])]);

        result2.push({ sign: '-', key, value: val1[key] });
        result2.push({ sign: '+', key, value: transform(val2[key]) });
      } else if (extraTypeOf(val1[key]) !== 'object' && extraTypeOf(val2[key]) !== 'object') {
        // result.push(['-', key, val1[key]]);
        // result.push(['+', key, val2[key]]);

        result2.push({ sign: '-', key, value: val1[key] });
        result2.push({ sign: '+', key, value: val2[key] });
      }
    }
  });

  // console.log('result2: ', result2)

  return result2;
};

export default compare;
