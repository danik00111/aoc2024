console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt: [60x60 grid of digits] */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8');
const data = input.split('\n').map(x=>x.split('').map(Number));
const find2d =(arr, v)=> arr.flatMap((r, ri) => (
  r.map((c, ci) => (c === v ? [ri, ci] : null))
  .filter(val => val !== null)
));

console.timeEnd('setup'); // 0.26812ms
console.time('part 1');

let trailtails = find2d(data,0).map(x=>[x]);
for (let i=0; i<trailtails.length; i++)
  for(let n=1;n<10;n++) {
    trailtails[i] = trailtails[i].flatMap(x=>(
      [
        [x[0]-1,x[1]], [x[0]+1,x[1]],
        [x[0],x[1]-1], [x[0],x[1]+1]
      ].filter(c=>(
        c[0]>=0
        &&c[1]>=0
        &&c[0]<data.length
        &&c[1]<data.length
      )).filter(c=>(data[c[0]][c[1]]==n))
    ));
    trailtails[i] = Array.from(new Set(trailtails[i].map(JSON.stringify))).map(JSON.parse);
  }

console.log(trailtails.flat().length);

console.timeEnd('part 1'); // 12.99146ms
console.time('part 2');

trailtails = find2d(data,0).map(x=>[x]);
for (let i=0; i<trailtails.length; i++)
  for(let n=1;n<10;n++) {
    trailtails[i] = trailtails[i].flatMap(x=>(
      [
        [x[0]-1,x[1]], [x[0]+1,x[1]],
        [x[0],x[1]-1], [x[0],x[1]+1]
      ].filter(c=>(
        c[0]>=0
        &&c[1]>=0
        &&c[0]<data.length
        &&c[1]<data.length
      )).filter(c=>(data[c[0]][c[1]]==n))
    ));
  }

console.log(trailtails.flat().length);

console.timeEnd('part 2'); // 7.72079ms