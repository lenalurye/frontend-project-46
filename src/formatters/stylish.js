import { isObject } from '../utils.js';

const dumpValue = (value, prefix) => {
  if (!isObject(value)) {
    return value;
  }
  const output = Object.keys(value).sort().map((key) => {
    const dump = dumpValue(value[key], `${prefix}    `);
    return `${prefix}        ${key}: ${dump}\n`;
  }).join('');
  return `{\n${output}${prefix}    }`;
};

const formatAddedOrRemoved = (prefix, key, value, symbol) => {
  const dump = dumpValue(value, prefix);
  return `${prefix}  ${symbol} ${key}: ${dump}\n`;
};

const formatChanged = (prefix, command) => {
  const dump1 = dumpValue(command.oldValue, prefix);
  const dump2 = dumpValue(command.newValue, prefix);
  return `${prefix}  - ${command.key}: ${dump1}\n${prefix}  + ${command.key}: ${dump2}\n`;
};

const formatNoChange = (prefix, command) => `${prefix}    ${command.key}: ${command.value}\n`;

const format = (diff, prefix = '') => {
  const formatNested = (command) => {
    const childrenDiff = format(command.children, `${prefix}    `);
    return `${prefix}    ${command.key}: ${childrenDiff}\n`;
  };
  const output = diff.map((command) => {
    switch (command.type) {
      case 'added':
        return formatAddedOrRemoved(prefix, command.key, command.newValue, '+');
      case 'removed':
        return formatAddedOrRemoved(prefix, command.key, command.oldValue, '-');
      case 'changed':
        return formatChanged(prefix, command);
      case 'no change':
        return formatNoChange(prefix, command);
      case 'nested':
        return formatNested(command);
      default:
        return '';
    }
  }).join('');
  return `{\n${output}${prefix}}`;
};

export default format;
