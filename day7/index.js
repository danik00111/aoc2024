console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt:
[large number, sometimes up to 13 digits]: [around 10 positive integers below 1000]
... (850 lines of that) */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8')
.split('\n').reduce((a,v)=>{
  const split = v.split(': ');
  a.push([
    Number(split[0]),
    split[1].split(' ').map(Number)
  ]);
  return a;
},[]);

console.timeEnd('setup'); // 1.91383ms
console.time('part 1');

console.log(input.map(n=>(
  [...Array(2**(n[1].length-1)).keys()].map(x=>(
    ( '0'.repeat(n[1].length-2) + x.toString(2) ).slice(-(n[1].length-1))
  )).map(binary=>( // WE BE WRITING SPAGHETTIS IN HERE 🗣️🗣️🗣️
    n[1].reduce((a,v,i)=>{
      if(i==0) return v;
      return eval(a+['+','*'][binary[i-1]]+v);
    },0)
  )).some(x=>x==n[0]) ? n[0] : 0
)).reduce((a,v)=>a+v,0));

console.timeEnd('part 1'); // average of 10: 8.2505s
/*WARNING: Part 2 may fail due to the heap running out of memory.
  I don't know what I changed, but it worked for me before I
  removed the debugging progress meter and cleaned the code up a little.
  Maybe split the input into two or three files and then run it
  on them separately for it to work. */
console.time('part 2');

console.log(input.map(n=>(
  [...Array(3**(n[1].length-1)).keys()].map(x=>(
    ( '0'.repeat(n[1].length-2) + x.toString(3) ).slice(-(n[1].length-1))
  )).map(binary=>(
    n[1].reduce((a,v,i)=>{
      if(i==0) return v;
      return eval(a+['+','*',''][binary[i-1]]+v);
    },0)
  )).some(x=>x==n[0]) ? n[0] : 0
)).reduce((a,v)=>a+v,0));

console.timeEnd('part 2'); // average of 1: 6:17.753 (m:ss.mmm)
// yeah im not running this code any more than once 🥶