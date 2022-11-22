import { program } from 'commander';
import path from 'node:path';
import generateDiffTree from './utils/generateDiffTree.js';
import { parseYaml, parseJson } from './parsers.js';
import selectFormatter from './formatters/index.js'

export const genDiff = (path1, path2, format) => {
  if (path.parse(path1).ext !== path.parse(path2).ext) {
    throw new Error('file extensions are different');
  }
  const extension = path.parse(path1).ext;

  let readFileData = null;

  switch (extension) {
    case '.json':
      readFileData = [parseJson(path1), parseJson(path2)];
      break;

    case '.yml':
    case '.yaml':
      readFileData = [parseYaml(path1), parseYaml(path1)];
      break;
    default:
      break;
  }

  let diffStructure = generateDiffTree(readFileData[0], readFileData[1]);
  
  // console.log('diffStructure; ' , JSON.stringify(diffStructure))

  const formatter = selectFormatter(format);
  console.log(formatter(diffStructure)) 
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

      genDiff(path1, path2, format);
    });

  program.parse(process.argv);
};

export default runDiff;
