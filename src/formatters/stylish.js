import { isObject } from '../utils.js';

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

const format = (diff, prefix = '') => {
  let output = '{\n';
  diff.forEach((command) => {
    let dump;
    switch (command.type) {
      case 'added':
        dump = dumpValue(command.newValue, prefix);
        output += `${prefix}  + ${command.key}: ${dump}\n`;
        break;
      case 'removed':
        dump = dumpValue(command.oldValue, prefix);
        output += `${prefix}  - ${command.key}: ${dump}\n`;
        break;
      case 'changed':
        dump = dumpValue(command.oldValue, prefix);
        output += `${prefix}  - ${command.key}: ${dump}\n`;
        dump = dumpValue(command.newValue, prefix);
        output += `${prefix}  + ${command.key}: ${dump}\n`;
        break;
      case 'no change':
        output += `${prefix}    ${command.key}: ${command.value}\n`;
        break;
      case 'nested':
        output += `${prefix}    ${command.key}: `;
        output += format(command.children, `${prefix}    `);
        output += '\n';
        break;
      default:
    }
  });
  return `${output}${prefix}}`;
};

export default format;
