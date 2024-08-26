import { isObject } from '../utils.js';

const dumpValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const keyPath = (path, command) => path.map((pathElement) => `${pathElement}.`).join('') + command.key;

const format = (diff, path = []) => {
  const output = [];
  diff.forEach((command) => {
    switch (command.type) {
      case 'added':
        output.push(`Property '${keyPath(path, command)}' was added with value: ${dumpValue(command.newValue)}`);
        break;
      case 'removed':
        output.push(`Property '${keyPath(path, command)}' was removed`);
        break;
      case 'changed':
        output.push(`Property '${keyPath(path, command)}' was updated. From ${dumpValue(command.oldValue)} to ${dumpValue(command.newValue)}`);
        break;
      case 'nested':
        output.push(format(command.children, [...path, command.key]));
        break;
      default:
    }
  });
  return output.join('\n');
};
export default format;
