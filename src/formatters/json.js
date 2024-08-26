const keyPath = (path, command) => path.map((pathElement) => `${pathElement}.`).join('') + command.key;

export default (diff) => {
  const output = [];
  const path = [];
  diff.forEach((command) => {
    switch (command.type) {
      case 'added':
      case 'removed':
      case 'changed':
        output.push({ ...command, key: keyPath(path, command) });
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
  return JSON.stringify(output, null, 2);
};
