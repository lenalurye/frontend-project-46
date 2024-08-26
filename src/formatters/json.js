const keyPath = (path, command) => path.map((pathElement) => `${pathElement}.`).join('') + command.key;

const format = (diff, path = []) => {
  const output = [];
  diff.forEach((command) => {
    switch (command.type) {
      case 'added':
      case 'removed':
      case 'changed':
        output.push({ ...command, key: keyPath(path, command) });
        break;
      case 'nested':
        output.push(...format(command.children, [...path, command.key]));
        break;
      default:
    }
  });
  return output;
};
export default (diff) => JSON.stringify(format(diff), null, 2);
