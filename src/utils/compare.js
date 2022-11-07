const compare = (val1, val2) => {
  const keysSet = new Set([...Object.keys(val1), ...Object.keys(val2)]);
  const keys = Array.from(keysSet);
  const result = [];

  keys.forEach((key) => {
    if (val1[key] === val2[key]) {
      result.push(['', key, val1[key]]);
    } else if (val1[key] === undefined && (val2[key] || val2[key] === false)) {
      result.push(['+', key, val2[key]]);
    } else if ((val1[key] || val1[key] === false) && val2[key] === undefined) {
      result.push(['-', key, val1[key]]);
    } else if (val1[key] !== val2[key]) {
      result.push(['-', key, val1[key]]);
      result.push(['+', key, val2[key]]);
    }
  });

  return result;
};

export default compare;
