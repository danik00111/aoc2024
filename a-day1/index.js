console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt:
1000 lines, each containing two 5-digit numbers separated by 3 spaces
*/
const data = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split('\n').reduce((a,v)=>{
  a[0].push(Number(v.split('   ')[0]));
  a[1].push(Number(v.split('   ')[1]));
  return a;
},[[],[]]);

data[0].sort((a,b)=>a-b);
data[1].sort((a,b)=>a-b);

console.timeEnd('setup'); // 2.33613ms
console.time('part 1');

console.log(
  data[0].reduce((a,v,i)=>(
    a + Math.abs(v - data[1][i])
  ),0)
);

console.timeEnd('part 1'); // 0.29065ms
console.time('part 2');

console.log(
  data[0].reduce((a,v,i)=>(
    a + v*(data[1].filter(x=>x===v)).length
  ),0)
);

console.timeEnd('part 2'); // 13.48042ms