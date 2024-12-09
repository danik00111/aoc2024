console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt: [huge 20k digit number] */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8');

console.timeEnd('setup');
// console.time('part 1');


// console.timeEnd('part 1');
// console.time('part 2');


// console.timeEnd('part 2');