/** 
 * 
 * 醉汉问题
*/


class Location {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(loc) {
    return new Location(this.x + loc.x, this.y + loc.y);
  }

  static distance(loc) {
    return Math.sqrt(loc.x * loc.x + loc.y * loc.y);
  }
}

const getRandomSign = () => Math.round(Math.random()) ? 1 : -1;
const getRandomPos = num => Math.random() * num;
const randomWalk = (steps, speed, location, times = 1) => {
  if (steps === 0) return location;
  const sign = getRandomSign();
  const randomX = sign * getRandomPos(speed);
  const signs = getRandomSign();
  const randomY = signs * (Math.sqrt(speed * speed - randomX * randomX));
  const newLoc = location.move(new Location(randomX, randomY));
//   console.log(`
//   ${times} times location
//   x: ${newLoc.x}
//   y: ${newLoc.y}
//   distance: ${Location.distance(newLoc)}
// `)
  return randomWalk(--steps, speed, newLoc, ++times);
}

class Drunk {
  constructor(name, speed = 1, loc = new Location(0, 0)) {
    this.name = name;
    this.speed = speed;
    this.loc = loc;
  }

  walk(steps, speed = this.speed, loc = this.loc) {
    const locs = randomWalk(steps, speed, loc);
    return Location.distance(locs);
  }
}

const bobi = new Drunk('bobi');

const trails = function(tail, nums) {
  let res = 0;
  for (let i = 0; i < nums; i++) {
    res += tail();
  }
  return res / nums;
}

const res = trails(() => bobi.walk(500,1), 40000);

console.log(`The final average distance is ${res}`)