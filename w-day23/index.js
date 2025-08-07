console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
// const ld = require('lodash'); // too lazy to make my own set equality checker
/* ./input.txt: 3380 pairs of two-letter codes, separated with a dash */
const nets = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split('\n').map(x=>new Set(x.split('-')));
const ids = [...nets.reduce((a,v)=>(
  a.union(v)
),new Set())];

console.timeEnd('setup');
console.time('part 1');


let tnets = new Set(
nets.filter(x=>[...x].some(y=>y.startsWith('t')))
.map(x=>[...x].sort((_,y)=>y.startsWith('t')-0.5))
);
let ttnets = [...tnets].filter(x=>x[0].startsWith('t')&&x[1].startsWith('t'));
tnets = [...tnets.difference(new Set(ttnets))].reduce((obj,pair)=>{
  const string = [...pair].join('');
  obj[string[1]] = new Set(obj[string[1]]);
  obj[string[1]].add([...pair][1]);
  return obj;
},{})

// count threenets with two t-computers
let count = ttnets.reduce((a,v)=>(a + tnets[v[0][1]].intersection(tnets[v[1][1]]).size),0)
// count threenets with one t-computer
tnets = Object.entries(tnets);
console.log(nets);
for(let i=0;i<tnets.length;i++){
  // for each list of computers connected to the same t-computer, check if they are connected (form a triangle)
  console.log(tnets[i]);
  for(let a=0;a<i-1;a++)
  for(let b=a+1;b<i;b++) {
    // console.log(i,j);
  }
}
// console.log(count);

console.timeEnd('part 1');