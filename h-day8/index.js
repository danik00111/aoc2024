console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt: [50x50 grid mostly of dots, with some 0-9a-zA-Z] */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split('\n').map(x=>x.split(''));
const chars = new Set(input.flat());
chars.delete('.');
const find2d =(arr, v)=> arr.flatMap((r, ri) => (
  r.map((c, ci) => (c === v ? [ri, ci] : null))
  .filter(val => val !== null)
));
const coords = Array.from(chars).map(x=>find2d(input,x));

console.timeEnd('setup'); // 7.0742ms
console.time('part 1');

let possibleAntinodes = coords.flatMap(x=>{
  const an = [];
  for(let i=0;i<x.length;i++)
  for(let j=0;j<x.length;j++) {
    if(i==j) continue;
    const vec = [ x[i][0]-x[j][0], x[i][1]-x[j][1] ];
    an.push([ x[i][0]+vec[0], x[i][1]+vec[1] ]);
  }
  return an;
}); // has out-of-bounds and repeats
let antinodes = Array.from(new Set( // filter dupes out of the array you feed into it
  possibleAntinodes.filter(x=>(
    x[0]>=0
  &&x[1]>=0
  &&x[0]<input.length
  &&x[1]<input.length
  )).map(JSON.stringify) // so that Set() actually works
));
console.log(antinodes.length);

console.timeEnd('part 1'); // 0.83966ms
console.time('part 2');

possibleAntinodes = coords.flatMap(x=>{
  const an = [];
  for(let i=0;i<x.length;i++)
  for(let j=0;j<x.length;j++) {
    if(i==j) continue;
    const vec = [ x[i][0]-x[j][0], x[i][1]-x[j][1] ];
    const anti = [...x[j]];
    while(
      anti[0]>=0
    &&anti[1]>=0
    &&anti[0]<input.length
    &&anti[1]<input.length
    ) {
      anti[0] += vec[0];
      anti[1] += vec[1];
      an.push([...anti]);
    }
  }
  return an;
}); // has out-of-bounds and repeats
antinodes = Array.from(new Set( // filter dupes out of the array you feed into it
  possibleAntinodes.filter(x=>(
    x[0]>=0
  &&x[1]>=0
  &&x[0]<input.length
  &&x[1]<input.length
  )).map(JSON.stringify) // so that Set() actually works
))
console.log(antinodes.length);

console.timeEnd('part 2'); // 2.68789ms