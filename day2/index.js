console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt:
1000 lines, each with somewhere around 7 positive integers below 100
*/
const data = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split('\n').map(x=>x.split(' '));

console.timeEnd('setup'); // 1.17531ms
console.time('part 1');

console.log(data.filter(x=>{
  const sgn = Math.sign(x[0]-x[1]);
  for(let i=1;i<x.length;i++) {
    if(Math.abs(x[i-1]-x[i]) < 1) return false;
    if(Math.abs(x[i-1]-x[i]) > 3) return false;
    if(Math.sign(x[i-1]-x[i]) != sgn) return false;
  }
  return true;
}).length);

console.timeEnd('part 1'); // 0.94709ms
console.time('part 2');

console.log(data.filter(x=>{
  const xpossible = [];
  for(let i=0;i<x.length;i++) {
    const n = x.slice();
    n.splice(i,1);
    xpossible.push(n);
  }
  return xpossible.some(xx=>{
    const sgn = Math.sign(xx[0]-xx[1]);
    for(let i=1;i<xx.length;i++) {
      if(Math.abs(xx[i-1]-xx[i]) < 1) return false;
      if(Math.abs(xx[i-1]-xx[i]) > 3) return false;
      if(Math.sign(xx[i-1]-xx[i]) != sgn) return false;
    }
    return true;
  })
}).length);

console.timeEnd('part 2'); // 3.95226ms