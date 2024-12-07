
console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./rules.txt:
~1.1k lines, each being X|Y (where X and Y aare two-digit positive integers)
*/
const rules = fs.readFileSync(path.join(`${__dirname}/rules.txt`), 'utf8').split('\n').map(x=>x.split('|'));
/* ./updates.txt:
~175 lines, each having around a dozen positive 2-digit integers, separated by comma (without spaces)
*/
const updates = fs.readFileSync(path.join(`${__dirname}/updates.txt`), 'utf8').split('\n').map(x=>x.split(','));

console.timeEnd('setup'); // 1.17698ms
console.time('part 1');

console.log(updates.filter(x=>
  rules.every(y=>
    !(x.includes(y[0])) || !(x.includes(y[1])) || x.indexOf(y[0]) < x.indexOf(y[1])
  )
).reduce((a,v)=>a+(
  Number(v[Math.ceil(v.length/2)-1])
),0));

console.timeEnd('part 1'); // 7.0521ms
console.time('part 2');

const wrongupds = updates.filter(x=>!(
  rules.every(y=>
    !(x.includes(y[0])) || !(x.includes(y[1])) || x.indexOf(y[0]) < x.indexOf(y[1])
  )
));

wrongupds.forEach(x=>{
  while(!(rules.every(y=>!(x.includes(y[0])) || !(x.includes(y[1])) || x.indexOf(y[0]) < x.indexOf(y[1])))) {
    rules.forEach(y=>{
      if(!(x.includes(y[0]) && x.includes(y[1]))) return;
      if(x.indexOf(y[0]) < x.indexOf(y[1])) return;
      temp = x[x.indexOf(y[0])];
      x[x.indexOf(y[0])] = x[x.indexOf(y[1])];
      x[x.indexOf(y[1])] = temp;
    });
  }
});

console.log(wrongupds.reduce((a,v)=>a+(
  Number(v[Math.ceil(v.length/2)-1])
),0));

console.timeEnd('part 2'); // 30.43773ms