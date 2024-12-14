// I don't feel like parsing the input a bajillion times.
// So I used find-replace and formatted it into JSON.
console.time('setup');

/* ./input.json:
  array of 320 objects each with 3 two-dimensional vectors, "3", "1", and "prize",
  with the "3" and "1" vectors being 2-digit, and the "prize" vectors being up to 5-digit
*/
const input = require('./input.json');
/*
{
  "3": [a, c], // has to be pressed x times
  "1": [b, d], // has to be pressed y times
  "prize": [n, m]
}
*/

console.timeEnd('setup'); // 0.78434ms
console.time('part 1');

console.log(input.map(data=>{
  /*
  ax+by = n
  cx+dy = m
  */
  const [a,b,n,c,d,m] = [
    data[3][0], data[1][0], data['prize'][0],
    data[3][1], data[1][1], data['prize'][1]
  ];
  const y = (a*m-c*n)/(a*d-b*c);
  const x = (n-b*y)/a;
  return [x,y];
}).filter(data=>(
  Number.isInteger(data[0]) && Number.isInteger(data[1])
)).reduce((a,v)=>(
  a+(v[0]*3+v[1])
),0));

console.timeEnd('part 1'); // 0.65303ms
console.time('part 2');

console.log(input.map(data=>({
  ...data,
  "prize": [ data['prize'][0]+1e13, data['prize'][1]+1e13 ]
})).map(data=>{ // all of the code below is the exact same, copy-pasted
  /*
    ax+by = n
    cx+dy = m
  */
  const [a,b,n,c,d,m] = [
    data[3][0], data[1][0], data['prize'][0],
    data[3][1], data[1][1], data['prize'][1]
  ];
  const y = (a*m-c*n)/(a*d-b*c);
  const x = (n-b*y)/a;
  return [x,y];
}).filter(data=>(
  Number.isInteger(data[0]) && Number.isInteger(data[1])
)).reduce((a,v)=>(
  a+(v[0]*3+v[1])
),0));

console.timeEnd('part 2'); // 0.86798ms