export const isObject = (value) => {
  if (typeof value === 'object' && value !== null) {
    return true;
  }
  return false;
};

export const uniqueKeys = (config1, config2) => {
  // Collect unique keys.
  const uniqueKeysObj = {};
  Object.keys(config1).forEach((key) => { uniqueKeysObj[key] = 1; });
  Object.keys(config2).forEach((key) => { uniqueKeysObj[key] = 1; });
  // Sort unique keys.
  const uniqueKeysArray = Object.keys(uniqueKeysObj);
  return uniqueKeysArray.sort();
};

export const keyPath = (path, command) => path.map((pathElement) => `${pathElement}.`).join('') + command.key;
