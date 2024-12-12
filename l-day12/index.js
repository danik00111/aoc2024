console.time('setup');

const fs = require('node:fs');
const path = require('node:path');
/* ./input.txt: 140x140 2d grid of letters, and there's A LOT of adjacent same letters */
const input = fs.readFileSync(path.join(`${__dirname}/input.txt`), 'utf8').split('\n').map(x=>x.split(''));
// const input = fs.readFileSync(path.join(`${__dirname}/sample.txt`), 'utf8').split('\n').map(x=>x.split(''));
const neighbourlib = [
  {y:-1,x:0},{y:1,x:0},
  {y:0,x:-1},{y:0,x:1},
]

console.timeEnd('setup');
console.time('part 1');

const data = [];
for(let i=0;input.flat().some(x=>typeof x === 'string');i++) {
  const pos = input.flat().findIndex(x=>typeof x === 'string');
  if(pos==-1) { console.log('exit thru break and not for'); break; } // Juuuuuust in case...
  const area = [];
  const stack = [{
    y: Math.floor(pos/input[0].length),
    x: pos%input.length
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
  area.forEach(vv=>{
    const nonborders = neighbourlib.map(vec=>({
      y: vv.y+vec.y,
      x: vv.x+vec.x
    }))
    .filter(vec=>vec.y>=0&&vec.x>=0&&vec.y<input.length&&vec.x<input[0].length)
    .filter(vec=>input[vec.y][vec.x]==letter);
    perimeter += 4-nonborders.length;
  })
  area.forEach(vv=>{
    input[vv.y][vv.x] = i;
  })
  data.push({area:area.length,perimeter});
}
console.log(data.reduce(
  (a,v)=>a+(v.area*v.perimeter)
,0));

console.timeEnd('part 1');
console.time('part 2');



console.timeEnd('part 2');