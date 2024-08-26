export const isObject = (value) => {
  if (typeof value === 'object' && value !== null) {
    return true;
  }
  return false;
};

export const uniqueKeys = (config1, config2) => {
  // Collect unique keys.
  const keys1 = Object.keys(config1).map((key) => [key, 1]);
  const keys2 = Object.keys(config2).map((key) => [key, 1]);
  const uniqueKeysObj = Object.fromEntries([...keys1, ...keys2]);
  // Sort unique keys.
  const uniqueKeysArray = Object.keys(uniqueKeysObj);
  return uniqueKeysArray.toSorted();
};

export const keyPath = (path, command) => path.map((pathElement) => `${pathElement}.`).join('') + command.key;
