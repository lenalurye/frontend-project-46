import fileParse from './format.js';

const isObject = (value) => {
  if (typeof value === 'object' && value !== null) {
    return true;
  }
  return false;
};

const dumpValue = (value, prefix) => {
  if (!isObject(value)) {
    return value;
  }
  let output = '';
  Object.keys(value).sort().forEach((key) => {
    const dump = dumpValue(value[key], `${prefix}    `);
    output += `${prefix}        ${key}: ${dump}\n`;
  });
  return `{\n${output}${prefix}    }`;
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

const diffConfigs = (config1, config2, prefix = '') => {
  // Output the difference.
  let output = '';
  uniqueKeys(config1, config2).forEach((key) => {
    const has1 = Object.hasOwn(config1, key);
    const has2 = Object.hasOwn(config2, key);
    const value1 = config1[key];
    const value2 = config2[key];
    if (has1 && has2) {
      if (isObject(value1) && isObject(value2)) {
        const diff = diffConfigs(value1, value2, `${prefix}    `);
        output += `${prefix}    ${key}: ${diff}\n`;
        return;
      }
      if (value1 === value2) {
        output += `${prefix}    ${key}: ${value1}\n`;
        return;
      }
    }
    if (has1) {
      const dump = dumpValue(value1, prefix);
      output += `${prefix}  - ${key}: ${dump}\n`;
    }
    if (has2) {
      const dump = dumpValue(value2, prefix);
      output += `${prefix}  + ${key}: ${dump}\n`;
    }
  });
  return `{\n${output}${prefix}}`;
};

const diff = (filepath1, filepath2) => {
  const config1 = fileParse(filepath1);
  const config2 = fileParse(filepath2);
  return diffConfigs(config1, config2);
};

export default diff;
