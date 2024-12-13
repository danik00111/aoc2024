console.log('The timing for separate parts is not quite applicable here, as a lot of code for part 1 and part 2 are done together.');
console.log('See the code for more info.');
console.time('main');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt: 140x140 2d grid of letters, and there's A LOT of adjacent same letters */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split('\n').map(x=>x.split(''));
const neighbourlib = [
  {y:-1,x:0},{y:1,x:0},
  {y:0,x:-1},{y:0,x:1},
]

const data = [];
for(let i=0;input.flat().some(x=>typeof x === 'string');i++) {
  const pos = input.flat().findIndex(x=>typeof x === 'string');
  const area = [];
  const stack = [{
    y: Math.floor(pos/input.length),
    x: pos%input[0].length
  }];
  area.push(stack[0]);
  const letter = input[stack[0].y][stack[0].x];
  while(stack.length) {
    const checkedcell = stack.shift();
    const nbcells = neighbourlib.map(vec=>({
      y: vec.y+checkedcell.y,
      x: vec.x+checkedcell.x
    })).filter(vec=>vec.y>=0&&vec.x>=0&&vec.y<input.length&&vec.x<input[0].length
    ).filter(vec=>input[vec.y][vec.x]==letter);
    nbcells.forEach(vec=>{
      if(area.map(JSON.stringify).some(x=>x==JSON.stringify(vec))) return;
      area.push(vec); stack.push(vec);
    })
  }
  let perimeter = 0;
  let borders = [];
  area.forEach(vv=>{
    const nonborders = neighbourlib.map(vec=>({
      y: vv.y+vec.y,
      x: vv.x+vec.x,
      bdy: vv.y+vec.y/2,
      bdx: vv.x+vec.x/2
    }))
    .filter(vec=>vec.y>=0&&vec.x>=0&&vec.y<input.length&&vec.x<input[0].length)
    .filter(vec=>input[vec.y][vec.x]==letter);
    
    const bds = neighbourlib.map(vec=>({
      y: vv.y+vec.y,
      x: vv.x+vec.x,
      bdy: vv.y+vec.y/3,
      bdx: vv.x+vec.x/3
    })).filter(vec=>{
      if(!( vec.y>=0&&vec.x>=0&&vec.y<input.length&&vec.x<input[0].length )) return true;
      if(!( input[vec.y][vec.x]==letter )) return true;
      return false;
    })
    perimeter += 4-nonborders.length;
    bds.forEach(vec=>{
      borders.push({y:vec.bdy,x:vec.bdx})
    });
  })
  area.forEach(vv=>{
    input[vv.y][vv.x] = i; // Marks region as done for the for-loop above by turning it into numbers. Do not delete!
  })
  // The code below passes the data for part 2
  const vbds = {};
  const hbds = {};
  borders.filter(vec=>Number.isInteger(vec.y)).forEach(vec=>{
    if (vbds[vec.x] === undefined)
      vbds[vec.x] = [];
    vbds[vec.x].push(vec.y);
  });
  borders.filter(vec=>Number.isInteger(vec.x)).forEach(vec=>{
    if (hbds[vec.y] === undefined)
      hbds[vec.y] = [];
    hbds[vec.y].push(vec.x);
  });
  data.push({letter,area:area.length,perimeter,vbds,hbds});
}
// IDEA: write down the fence coords (e.g. {x: 3, y:4.5}) (fence between (3,4) and (3,5)) and see which ones are part of the same side
// WHAT HAPPENED: had to rewrite as {x: 3, y:4.33}) to also denote that the cell the fence connects to is (3,4).
// Thank you for pointing this out, AAAA\nAABA\nABAA\nAAAA.
console.timeEnd('main'); // 2.72628s
console.time('part 1 log');

console.log(data.reduce((a,v)=>a+(v.area*v.perimeter),0));

console.timeEnd('part 1 log'); // 0.31554ms
console.time('part 2 calc+log');

data.forEach(x=>{
  x.vborders = Object.values(x.vbds).map(y=>{
    let str = '';
    for(let i=0;i<Math.max(...y)+1;i++) {
      str += +(y.includes(i));
    }
    while(str.includes('11')) str = str.replaceAll('11','1');
    while(str.includes('00')) str = str.replaceAll('00','0');
    return str.split('0').join('').length;
  })
  x.hborders = Object.values(x.vbds).map(y=>{
    let str = '';
    for(let i=0;i<Math.max(...y)+1;i++) {
      str += +(y.includes(i));
    }
    while(str.includes('11')) str = str.replaceAll('11','1');
    while(str.includes('00')) str = str.replaceAll('00','0');
    return str.split('0').join('').length;
  })
  x.sides = x.vborders.concat(x.hborders).reduce((a,v)=>a+v,0)
});

console.log(data.reduce((a,v)=>a+(v.area*v.sides),0));

console.timeEnd('part 2 calc+log'); // 102.68284ms