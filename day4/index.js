console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt:
140x140 grid out of letters X, M, A, and S
*/
const data = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split('\n');

console.timeEnd('setup'); // 0.16391ms
console.time('part 1');

const horiz = data.reduce((a,v)=>a+(
  v.split('XMAS').length - 1
  + v.split('SAMX').length - 1
),0);
const rotat_e=m=>m[0].map((_,i)=>m.map(r=>r[i]));
const vert = rotat_e(data.map(x=>x.split(''))).map(x=>x.join('')).reduce((a,v)=>a+(
  v.split('XMAS').length - 1
  + v.split('SAMX').length - 1
),0);
// OKAY. IF IT WORKS, IT WORKS. DON'T TOUCH IT.
// also input is a square so thats convenient
const diag = [];
for(let i=0;i<data.length;i++) {
  let tempst = '';
  for (let j=0;j<data.length-i;j++) {
    tempst += data[i+j][j];
  }
  diag.push(tempst);
}
for(let i=1;i<data.length;i++) {
  let tempst = '';
  for (let j=0;j<data.length-i;j++) {
    tempst += data[j][i+j];
  }
  diag.push(tempst);
}
for(let i=data.length-1;i>=0;i--) {
  let tempst = '';
  for (let j=0;j<=i;j++) {
    tempst += data[i-j][j]
  }
  diag.push(tempst);
}
for(let i=1;i<data.length;i++) {
  let tempst = '';
  for (let j=0;j<data.length-i;j++) {
    tempst += data[i+j][data.length-1-j]
  }
  diag.push(tempst);
}
const diags = diag.reduce((a,v)=>a+(
  v.split('XMAS').length - 1
  + v.split('SAMX').length - 1
),0);
console.log(horiz+vert+diags);

console.timeEnd('part 1'); // 11.58724ms
console.time('part 2');

let count = 0;
for(let i=1;i<data.length-1;i++)
  for(let j=1;j<data.length-1;j++) {
if(data[i][j]!='A') continue;
const corners = data[i-1][j-1] + data[i-1][j+1] + data[i+1][j-1] + data[i+1][j+1];
if(['SMSM','MMSS','MSMS','SSMM'].includes(corners)) count++;
}
console.log(count);

console.timeEnd('part 2'); // 1.55371ms