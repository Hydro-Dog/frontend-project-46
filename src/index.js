import { program } from 'commander';
import path from 'node:path';
import compare from './utils/compare.js';
import { sort } from './utils/sort.js';
import { parseYaml, parseJson } from './parsers.js';
import selectFormatter from './formatters/index.js';

export const genDiff = (path1, path2, format) => {
  if (path.parse(path1).ext !== path.parse(path2).ext) {
    throw new Error('file extensions are different');
  }
  const extension = path.parse(path1).ext;

  let readFileData = null;

  switch (extension) {
    case '.json':
      readFileData = Promise.allSettled([
        parseJson(path1),
        parseJson(path2),
      ]);
      break;

    case '.yml':
    case '.yaml':
      readFileData = Promise.allSettled([
        parseYaml(path1),
        parseYaml(path1),
      ]);
      break;
    default:
      break;
  }

  return readFileData
    .then(([res1, res2]) => {
      let diffStructure = compare(res1.value, res2.value);
      // diffStructure = sort(diffStructure);
      console.log('diffStructure; ' , JSON.stringify(diffStructure))

      // const formatter = selectFormatter(format);
      // return formatter(diffStructure);
    })
    .catch(console.error);
};

const runDiff = () => {
  program
    .version('1.0.0')
    .argument('<path1>', 'path to file')
    .argument('<path2>', 'path to file')
    .description('Find json files diff');

  program
    .helpOption('-h, --help', 'output usage information')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format', 'stylish');

  program
    .action(() => {
      const { format } = program.opts();

      const [path1, path2] = program.args;

      genDiff(path1, path2, format).then(console.log);
    });

  program.parse(process.argv);
};

export default runDiff;
