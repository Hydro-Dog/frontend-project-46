import { program } from 'commander';
import path from 'node:path';
import compare from './utils/compare.js';
import sort from './utils/sort.js';
import { parseYaml, parseJson } from './parsers.js';
import extraTypeOf from './utils/extraTypeOf.js';

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

          result = sort(result);

          //   console.log('result: ', result.length, result, '-----------');

          const calcSpaces = (length) => Array.from({ length }, () => ' ').join('')

          const foo = (data, spaces = 0, isChild) => data.map(({ sign, key, value }, index, arr) => {
            const leftSpacesSymbol = calcSpaces(spaces);
            const signSymdol = sign ? `${sign} ` : '  ';
            const keySymbol = `${key}: `;
            const valueSymbol = extraTypeOf(value) === 'array' ? `{\n${foo(value, spaces + 4).join('')}` : `${value}${index === arr.length - 1 ? `\n${calcSpaces(spaces - 2)}}` : ''} \n`;

            return leftSpacesSymbol + signSymdol + keySymbol + valueSymbol;
          });

          console.log('fins');
          console.log(`${foo(result).join('')}`);
        })
        .catch(console.error);
    });

  program.parse(process.argv);
};

export default runDiff;
