console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./area.txt: [50x50 map, with border tiles being #s, and the inside tiles being either # (not much), O, or . (most of them), and a single @] */
let area = fs.readFileSync(path.join(`${__dirname}/area.txt`), 'utf8').split('\n').map(x=>x.split(''));
/* ./moves.txt: 20k characters of ^>v<, separated by newlines at set intervals for ease of readability */
const moves = fs.readFileSync(path.join(`${__dirname}/moves.txt`), 'utf8').replaceAll('\n','').split('');
const dirs = {
  '^': [-1,  0],
  '>': [ 0, +1],
  'v': [+1,  0],
  '<': [ 0, -1],
};
const find2d =(arr, v)=> arr.flatMap((r, ri) => (
  r.map((c, ci) => (c === v ? [ri, ci] : null))
  .filter(val => val !== null)
));
const widetiles = {
  '#': '##',
  'O': '[]',
  '.': '..',
  '@': '@.'
};
const sleep =x=> {
  const waitTill = new Date(new Date().getTime() + x);
  while(waitTill > new Date());
};

console.timeEnd('setup');
console.time('part 1');

for (let i=0; i<moves.length; i++) {
  // sleep(5e3);
  const direction = dirs[moves[i]];
  const robotpos = find2d(area,'@')[0];
  let pointer = robotpos;
  do {
    pointer = pointer.map((x,i)=>x+direction[i]);
  } while(area[pointer[0]][pointer[1]] == 'O');
  if(area[pointer[0]][pointer[1]] == '#') continue;
  area[robotpos[0]][robotpos[1]] = '.';
  const next = robotpos.map((x,i)=>x+direction[i])
  if(area[next[0]][next[1]]=='O')
    area[pointer[0]][pointer[1]] = 'O';
  area[next[0]][next[1]] = '@';
}

const boxes = find2d(area,'O');
console.log(boxes.reduce((a,v)=>a+(v[0]*100+v[1]),0));

// #..OO@, < => #.OO@.
//   ^ pointer
//      ^ robotpos
// #..OO@
// #..OO.
// #..O@.
// #.OO@. - conditional

console.timeEnd('part 1');
console.time('part 2');

area = area.map(x=>x.flatMap(y=>widetiles[y].split('')));
console.log(area.map(x=>x.join('')).join('\n'));
for (let i=0; i<moves.length; i++) {
  // sleep(5e3);
  const direction = dirs[moves[i]];
  const robotpos = find2d(area,'@')[0];
}

console.timeEnd('part 2');