#! /usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0')
  .argument('<path1>', 'path to file')
  .argument('<path2>', 'path to file')
  .description('Find json files diff');

program
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish');

program
  .action(() => {
    const { format } = program.opts();

    const [path1, path2] = program.args;

    const diff = genDiff(path1, path2, format);

    console.log(diff);
  });

program.parse(process.argv);
