#! /usr/bin/env node
import { program } from 'commander';

program
  .helpOption('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  

program.parse();

const options = program.opts();
