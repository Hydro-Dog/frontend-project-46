import yaml from 'js-yaml';

const parseData = (data, formatName) => {
  switch (formatName) {
    case 'json':
      return JSON.parse(data);

    case 'yml':
    case 'yaml':
      return yaml.load(data);

    default:
      break;
  }

  return undefined;
};

export default parseData;
