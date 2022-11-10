const sortByKeys = (data) => data.sort((
  { key: keyA },
  { key: keyB },
) => {
  if (keyA < keyB) {
    return -1;
  }
  if (keyA > keyB) {
    return 1;
  }
  return 0;
});

const sort = (data) => {
  const data2 = sortByKeys(data);
  data2.map((item) => {
    if (Array.isArray(item.value)) {
      return sort(item.value);
    }
    return item;
  });

  return data2;
};

export default sort;
