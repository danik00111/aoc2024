console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt: [literally 8 non-negative integers, some zero, some small and some in the thousands/millions] */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split(' ').map(Number);

console.timeEnd('setup');
console.time('part 1');

let row = input;
for(let blinks=0;blinks<25;blinks++) {
  row = row.flatMap(x=>(
    x==0 ?1 :(
      String(x).length%2 ? x*2024 :(
        [
          Number(String(x).slice(0,String(x).length/2)),
          Number(String(x).slice(String(x).length/2))
        ]
      )
    )
  ))
}
console.log(row.length);

console.timeEnd('part 1');
console.time('part 2');

row = input;
const start = Date.now();
for(let blinks=0;blinks<75;blinks++) {
  console.log('t+'+(Date.now()-start)+': '+blinks+'/75');
  row = row.flatMap(x=>(
    x==0 ?1 :(
      String(x).length%2 ? x*2024 :(
        [
          Number(String(x).slice(0,String(x).length/2)),
          Number(String(x).slice(String(x).length/2))
        ]
      )
    )
  ))
}
console.log(row.length);

console.timeEnd('part 2');