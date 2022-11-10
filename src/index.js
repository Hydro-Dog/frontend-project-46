import { program } from 'commander';
import path from 'node:path';
import compare from './utils/compare.js';
import sort from './utils/sort.js';
import { parseYaml, parseJson } from './parsers.js';
import stylish from './stylish.js';

const runDiff = () => {
  program
    .version('1.0.0')
    .description('Find json files diff');

  program
    .helpOption('-h, --help', 'output usage information')
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format');

  program
    .action(() => {
      const extension = path.parse(process.argv[2]).ext;
      const file1path = process.argv[2];
      const file2path = process.argv[3];

      let readFileData = null;

      switch (extension) {
        case '.json':
          readFileData = Promise.allSettled([
            parseJson(file1path),
            parseJson(file2path),
          ]);
          break;

        case '.yml':
        case '.yaml':
          readFileData = Promise.allSettled([
            parseYaml(file1path),
            parseYaml(file2path),
          ]);
          break;
        default:
          break;
      }

      readFileData
        .then(([res1, res2]) => {
          let result = compare(res1.value, res2.value);

          console.log('result: ', result)
          result = sort(result);
          console.log('result2: ', result)

          console.log('fins---');
          console.log(stylish(result));
        })
        .catch(console.error);
    });

  program.parse(process.argv);
};

export default runDiff;
