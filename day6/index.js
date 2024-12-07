console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt:
130x130 grid out of dots and #s, and a single ^ */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8')
.split('\n').map(x=>x.split(''));
let data = JSON.parse(JSON.stringify(input));

let pos = [];

for(let i=0;i<data.length;i++){
  if(data[i].some(x=>x=='^')) {
    pos[0] = i; break;
  }
}

pos[1] = data[pos[0]].indexOf('^');

let dir = 0; // 0123 up left down right

const mv =()=> {
  const poss = [...pos];
  poss[dir%2] += (dir>1)*2-1;
  // this is the most unreadable line of code ever! :D
  return poss;
}

console.timeEnd('setup'); // 1.99052ms
console.time('part 1');

while(
  mv()[0] >= 0
&&mv()[1] >= 0
&&mv()[0] < data.length
&&mv()[1] < data[0].length
) {
  data[pos[0]][pos[1]] = 'X';
  if(data[mv()[0]][mv()[1]] == '#') {
    dir--; if(dir==-1) dir=3;
    continue;
  };
  pos = mv(dir);
  data[pos[0]][pos[1]] = 'X';
}

console.log(data.flat().filter(x=>x=='X').length);

console.timeEnd('part 1'); // 6.47396ms
console.time('part 2');

let count = 0;

for(let y=0;y<data.length;y++) {
for(let x=0;x<data[0].length;x++) {
    if(input[y][x] == '#') continue;
    if(input[y][x] == '^') continue;

    data = JSON.parse(JSON.stringify(input));
    data[y][x] = '#';

  for(let i=0;i<data.length;i++){
    if(data[i].some(x=>x=='^')) {
      pos[0] = i; break;
    }
  }
  pos[1] = data[pos[0]].indexOf('^');
  dir = 0;
  data[pos[0]][pos[1]] = '.';

  while(
    mv()[0] >= 0
  &&mv()[1] >= 0
  &&mv()[0] < data.length
  &&mv()[1] < data[0].length
  ) {
    if(data[pos[0]][pos[1]].includes(dir+'')) {
      count++; break;
    };
    data[pos[0]][pos[1]] += dir;
    if(data[mv()[0]][mv()[1]] == '#') {
      dir--; if(dir==-1) dir=3;
      continue;
    };
    pos = mv(dir);
  }
}}

console.log(count);

console.timeEnd('part 2'); // average of 5: 38.5554s