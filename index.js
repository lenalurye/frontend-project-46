import fileParse from './format.js';

const diff = (filepath1, filepath2) => {
  const config1 = fileParse(filepath1);
  const config2 = fileParse(filepath2);
  return diffConfigs(config1, config2);
};

const diffConfigs = (config1, config2) => {
  // Collect unique keys.
  const uniqueKeys = {};
  for (const key of Object.keys(config1)) {
    uniqueKeys[key] = 1;
  }
  for (const key of Object.keys(config2)) {
    uniqueKeys[key] = 1;
  }

  // Sort unique keys.
  const uniqueKeysArray = Object.keys(uniqueKeys);
  uniqueKeysArray.sort();

  // Output the difference.
  let output = '';
  for (const key of uniqueKeysArray) {
    const has1 = config1.hasOwnProperty(key);
    const has2 = config2.hasOwnProperty(key);
    const value1 = config1[key];
    const value2 = config2[key];
    if (has1 && has2 && value1 === value2) {
      output += `    ${key}: ${value1}\n`;
      continue;
    }
    if (has1) {
      output += `  - ${key}: ${value1}\n`;
    }
    if (has2) {
      output += `  + ${key}: ${value2}\n`;
    }
  }
  return `{\n${output}}`;
};

export default diff;
