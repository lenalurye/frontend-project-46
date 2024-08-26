import fileParse from './parsers.js';
import format from './formatters/index.js';
import { isObject, uniqueKeys } from './utils.js';

const diffObjects = (obj1, obj2) => uniqueKeys(obj1, obj2).map((key) => {
  const has1 = Object.hasOwn(obj1, key);
  const has2 = Object.hasOwn(obj2, key);
  const val1 = obj1[key];
  const val2 = obj2[key];
  if (has1 && has2) {
    if (isObject(val1) && isObject(val2)) {
      return { type: 'nested', key, children: diffObjects(val1, val2) };
    }
    if (val1 === val2) {
      return { type: 'no change', key, value: val1 };
    }
    return {
      type: 'changed', key, oldValue: val1, newValue: val2,
    };
  }
  if (has1) {
    return { type: 'removed', key, oldValue: val1 };
  }
  return { type: 'added', key, newValue: val2 };
});

const diffFiles = (filepath1, filepath2, formatName) => {
  const config1 = fileParse(filepath1);
  const config2 = fileParse(filepath2);
  const diff = diffObjects(config1, config2);
  return format(diff, formatName);
};

export default diffFiles;
