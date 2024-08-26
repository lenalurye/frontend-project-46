import { isObject, keyPath } from '../utils.js';

const dumpValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const format = (diff, path = []) => diff.map((command) => {
  switch (command.type) {
    case 'added':
      return `Property '${keyPath(path, command)}' was added with value: ${dumpValue(command.newValue)}`;
    case 'removed':
      return `Property '${keyPath(path, command)}' was removed`;
    case 'changed':
      return `Property '${keyPath(path, command)}' was updated. From ${dumpValue(command.oldValue)} to ${dumpValue(command.newValue)}`;
    case 'nested':
      return format(command.children, [...path, command.key]);
    default:
      return '';
  }
}).filter((string) => string).join('\n');
export default format;
