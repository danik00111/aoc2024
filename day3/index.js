console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt:
~17.5k chars of gibberish, sometimes including do(), don't(), and mul(X,Y) (where X and Y are positive integers below 1000)
*/
const data = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8');

console.timeEnd('setup'); // 0.146ms
console.time('part 1');

const rgx1 = /mul\(\d+\,\d+\)/g;
const muls1 = data.match(rgx1)
const p1 = muls1.map(  x => x .split(/[\(,\)]/) .slice(1,3) .map(Number) .reduce((a,v)=>a*v,1)  ).reduce( (a,v)=>a+v,0 );
console.log(p1);

console.timeEnd('part 1'); // 1.29829ms
console.time('part 2');

const rgx2 = /(mul\(\d+\,\d+\))|(do\(\))|don't\(\)/g;
const muls2 = data.match(rgx2);
let do_ = true;
const p2 = muls2.reduce((a,v)=>{
  if(v=="don't()") { do_ = false; return a }
  if(v=="do()") { do_ = true; return a }
  if(!do_) return a;
  return a + v.match(rgx1).map(  x => x .split(/[\(,\)]/) .slice(1,3) .map(Number) .reduce( (a,v)=>a*v,1)  )[0]
},0)
console.log(p2);

console.timeEnd('part 2'); // 1.66835ms