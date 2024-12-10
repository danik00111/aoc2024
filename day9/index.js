console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt: [huge 20k digit number] */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8');
const data = [];
for (let i = 0; i < input.length; i++) {
  data.splice(data.length, 0, ...(Array(Number(input[i])).fill((
    i % 2 ? -1 : i/2
  ))));
}

console.timeEnd('setup');
console.time('part 1');

let i=0;
const arr = [...data];
while(arr.indexOf(-1)<arr.map(x=>Math.sign(x+1)).lastIndexOf(1)) {
  arr[arr.indexOf(-1)] = arr[arr.map(x=>Math.sign(x+1)).lastIndexOf(1)];
  arr[arr.map(x=>Math.sign(x+1)).lastIndexOf(1)] = -1;
  i++; if(!(i%100)) {
  }
}
console.log(arr.map(x=>x==-1?0:x).reduce((a,v,i)=>a+v*i,0));

console.timeEnd('part 1');
console.time('part 2');

i=0;
for(let i=Math.max(...data);i>0;i--) { // yeah i>0 is very inefficient
  // todo: do stuff... i guess
  // arr.findIndex((x,i)=>arr.slice(i,i+3).length==3 && arr.slice(i,i+3).every(x=>x==0))
}

console.timeEnd('part 2');