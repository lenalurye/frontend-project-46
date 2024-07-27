import { readFileSync } from 'node:fs';

const fileParse = (filepath) => JSON.parse(readFileSync(filepath));
export default fileParse;
