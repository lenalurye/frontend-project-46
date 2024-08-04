import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const format = (diff, formatName) => {
  if (formatName === 'plain') {
    return formatPlain(diff);
  }
  return formatStylish(diff);
};
export default format;
