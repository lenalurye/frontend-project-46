import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJSON from './json.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJSON(diff);
    default:
      return formatStylish(diff);
  }
};
export default format;
