console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/*
  im sorry but i dont think im writing out how the input for this one looks like, go see for yourself:
  https://adventofcode.com/2024/day/25/input
*/
const locks = fs.readFileSync(path.join(`${__dirname}/locks.txt`), 'utf8');
const keys = fs.readFileSync(path.join(`${__dirname}/keys.txt`), 'utf8');
const lk = locks.split('\n\n').map(x=>x.replaceAll('\n','').split('').map(y=>+(y=='#')));
const ky = keys.split('\n\n').map(x=>x.replaceAll('\n','').split('').map(y=>+(y=='#')));

console.timeEnd('setup');
console.time('part 1');

console.log(lk.reduce((acc,l)=>(
  acc + ky.reduce((y,k)=>(
    y + k.every((_,i)=>!(k[i]&&l[i]))
  ),0)
),0));

console.timeEnd('part 1');