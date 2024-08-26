const keyPath = (path, command) => path.map((pathElement) => `${pathElement}.`).join('') + command.key;

const format = (diff, path = []) => diff.flatMap((command) => {
  switch (command.type) {
    case 'added':
    case 'removed':
    case 'changed':
      return { ...command, key: keyPath(path, command) };
    case 'nested':
      return format(command.children, [...path, command.key]);
    default:
      return [];
  }
});
export default (diff) => JSON.stringify(format(diff), null, 2);
