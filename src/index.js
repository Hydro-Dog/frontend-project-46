import { program } from 'commander';
import { readFile } from 'node:fs/promises';
import compare from './utils/compare.js';
import sort from './utils/sort.js';

// const compare = (val1, val2) => {
//   const keysSet = new Set([...Object.keys(val1), ...Object.keys(val2)]);
//   const keys = Array.from(keysSet);
//   const result = [];

//   keys.forEach((key) => {
//     if (val1[key] === val2[key]) {
//       result.push(['', key, val1[key]]);
//     } else if (val1[key] === undefined && (val2[key] || val2[key] === false)) {
//       result.push(['+', key, val2[key]]);
//     } else if ((val1[key] || val1[key] === false) && val2[key] === undefined) {
//       result.push(['-', key, val1[key]]);
//     } else if (val1[key] !== val2[key]) {
//       result.push(['-', key, val1[key]]);
//       result.push(['+', key, val2[key]]);
//     }
//   });

//   return result;
// };

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
      const file1path = process.argv[2];
      const file2path = process.argv[3];

      Promise.allSettled([
        readFile(file1path, { encoding: 'utf8' }),
        readFile(file2path, { encoding: 'utf8' }),
      ])
        .then(([res1, res2]) => {
          let result = compare(JSON.parse(res1.value), JSON.parse(res2.value));

          result = sort(result);

          const stringResult = result.map(([action, key, value]) => `  ${action || ' '} ${key}: ${value} \n`).join('');

          console.log(`{\n${stringResult}}`);
        })
        .catch(console.error);
    });

  program.parse(process.argv);
};

export default runDiff;
