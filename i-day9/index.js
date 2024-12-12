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

console.timeEnd('setup'); // 7.40196ms
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

console.timeEnd('part 1'); // average of 1: 2:04.266 (m:ss.mmm)
console.time('part 2');

for(i=Math.max(...data);i>0;i--) {
  const pos = data.indexOf(i);
  const amt = data.filter(x=>x==i).length;
  const freespot = data.findIndex((x,i)=>(data.slice(i,i+amt).length==amt)&&(data.slice(i,i+amt).every(x=>x==-1)))
  if(freespot>pos) continue;
  if(freespot==-1) continue;
  data.splice(pos,amt,...Array(amt).fill(-1));
  data.splice(freespot,amt,...Array(amt).fill(i));
}
console.log(data.map(x=>x==-1?0:x).reduce((a,v,i)=>a+v*i,0));

console.timeEnd('part 2'); // average of 5: 28.8458ms