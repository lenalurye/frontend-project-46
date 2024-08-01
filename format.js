import { readFileSync } from 'node:fs';
import path from 'path';
import yaml from 'js-yaml';

const fileParse = (filepath) => {
  const extension = path.extname(filepath.toLowerCase());
  const data = readFileSync(filepath);
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};
export default fileParse;
