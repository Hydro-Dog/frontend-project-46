import yaml from 'js-yaml';

const parseFile = (file, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(file);

    case '.yml':
    case '.yaml':
      return yaml.load(file);

    default:
      break;
  }

  return undefined;
};

export default parseFile;
