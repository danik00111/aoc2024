// i'm sorry but i'm not parsing that input either
// find-replacery json go brrrrrr
console.time('setup');
/* ./input.json: [array of 500 objects of this shape:]
{ "p": [n1,m1], "v": [n2,m2] }
(0≤n≤100, 0≤m≤102)
*/
// const input = require('./sample.json');
const input = require('./input.json');
/**
 * A mod function that actually works for any real
 * numbers in both the base and modulo. Even negatives.
 * @param {Number} x
 * @param {Number} mod
 * @returns {Number}
*/
const actualmod = (x,mod) => (
  x+Math.ceil(-x/mod)*Math.trunc(-Math.sign(x)+0.5)*mod
) % mod;
const [width, height] = [101, 103];

console.timeEnd('setup');
console.time('part 1');

console.log(input.map(data=>([
  actualmod((data.p[1]+(data.v[1]*5)),height),
  actualmod((data.p[0]+(data.v[0]*5)),width),
]))/* .filter(x=>(
  x[0] != (height-1)/2 &&
  x[1] != (width-1)/2
)).map(x=>(
  (x[0]>(height-1)/2)*1 + (x[1] > (width-1)/2)*2
)).reduce((a,v)=>{
  a[v]++;return a;
},[0,0,0,0]).reduce((a,v)=>a*v,1) */)

console.timeEnd('part 1');
console.time('part 2');

const display =()=> {console.log(
  canvas.reduce((a,v)=>{
    a[v.p[1]][v.p[0]] = '#';
    return a;
  },
  Array(height).fill('.'.repeat(width)).map(x=>x.split('')))
  .map(x=>x.join('')).join('\n')
)}
let steps = 6250;
/* "Why 6250"? Because I randomly guessed
it in the website and it said "too low"! */
let canvas = input.map(data=>({
  p:[
    actualmod((data.p[0]+(data.v[0]*steps)),width),
    actualmod((data.p[1]+(data.v[1]*steps)),height),
  ],
  v: data.v
}));
// 6250: too low
// 7500: too high
process.stdin.on('data',_=>{
  canvas = canvas.map(data=>({
    p:[
      actualmod((data.p[0]+data.v[0]),width),
      actualmod((data.p[1]+data.v[1]),height),
    ],
    v: data.v
  }));
  steps++;
  display();
  process.stdout.write(String(steps));
})

console.timeEnd('part 2');