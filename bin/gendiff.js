#!/usr/bin/env node
import { program } from 'commander';
import diff from '../src/diff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(diff(filepath1, filepath2, program.opts().format));
  });

program.parse();
