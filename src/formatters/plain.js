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

export default (diff) => {
  const output = [];
  const path = [];
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
      case 'in':
        path.push(command.key);
        break;
      case 'out':
        path.pop();
        break;
      default:
    }
  });
  return output.join('\n');
};
