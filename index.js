import fileParse from './format.js';

const diff = (filepath1, filepath2) => {
  const config1 = fileParse(filepath1);
  const config2 = fileParse(filepath2);
};
export default diff;
