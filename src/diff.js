import fileParse from './parsers.js';
import format from './formatters/index.js';

const isObject = (value) => {
  if (typeof value === 'object' && value !== null) {
    return true;
  }
  return false;
};

const uniqueKeys = (config1, config2) => {
  // Collect unique keys.
  const uniqueKeysObj = {};
  Object.keys(config1).forEach((key) => { uniqueKeysObj[key] = 1; });
  Object.keys(config2).forEach((key) => { uniqueKeysObj[key] = 1; });
  // Sort unique keys.
  const uniqueKeysArray = Object.keys(uniqueKeysObj);
  return uniqueKeysArray.sort();
};

const diffObjects = (obj1, obj2) => {
  const output = [];
  uniqueKeys(obj1, obj2).forEach((key) => {
    const has1 = Object.hasOwn(obj1, key);
    const has2 = Object.hasOwn(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (has1 && has2) {
      if (isObject(value1) && isObject(value2)) {
        output.push({ type: 'in', key });
        output.push(...diffObjects(value1, value2));
        output.push({ type: 'out' });
        return;
      }
      if (value1 === value2) {
        output.push({ type: 'no change', key, value: value1 });
        return;
      }
      output.push({
        type: 'changed',
        key,
        oldValue: value1,
        newValue: value2,
      });
    } else if (has1) {
      output.push({ type: 'removed', key, oldValue: value1 });
    } else {
      output.push({ type: 'added', key, newValue: value2 });
    }
  });
  return output;
};

const diffFiles = (filepath1, filepath2, formatName) => {
  const config1 = fileParse(filepath1);
  const config2 = fileParse(filepath2);
  const diff = diffObjects(config1, config2);
  return format(diff, formatName);
};

export default diffFiles;
