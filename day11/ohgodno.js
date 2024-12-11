console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt: [literally 8 non-negative integers, some zero, some small and some in the thousands/millions] */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split(' ').map(Number);

console.timeEnd('setup');
console.time('part 1');

let row = input;
for(let blinks=0;blinks<25;blinks++) {
  row = row.flatMap(x=>(
    x==0 ?1 :(
      String(x).length%2 ? x*2024 :(
        [
          Number(String(x).slice(0,String(x).length/2)),
          Number(String(x).slice(String(x).length/2))
        ]
      )
    )
  ))
}
console.log(row.length);

console.timeEnd('part 1');
console.time('part 2');

function add(a, b) {
  if(a.length < b.length) { x=a; y=b } else { x=b; y=a }
  while(x.length < y.length) x = '0'+x;
  sum = ''; carry = 0;
  for(let i = x.length-1; i>=0; i-- ) {
    p = parseInt(x.charAt(i));
    q = parseInt(y.charAt(i));
    partsum = p+q+carry;
    sum = (partsum)%10 + sum;
    if(partsum>=10) carry = 1; else carry = 0;
  }
  if(carry == 1) sum = carry + sum;
  return sum;
} // I HATE BIGINT I HATE BIGINT I HATE BIGINT I HATE BIGINT I HATE BIGINT I HATE BIGINT 
row = input;
freq = {};
row.forEach(x=>{ freq[x] = '1' });
let temp = {};
for(let blinks=0;blinks<75;blinks++) {
  temp = {};
  Object.entries(freq).forEach(([x,amt])=>{
    const thing = +x == 0 ?[1] :(
      x.length%2 ? [x*2024] :(
        [ +(x.slice(0,x.length/2)), +(x.slice(x.length/2)) ]
      )
    );
    thing.forEach(x=>{ temp[x] = add((temp[x]|0)+'',amt+'') });
  });
  freq = temp;
}

const amount = Object.entries(freq).length;
console.log(Object.values(freq).reduce((a,v,i)=>{
  return add(a+'',v+'')
},'0'));

console.timeEnd('part 2');