const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n");
let events = [];
let guards = [];

events = input.map(i => {
  const time = new Date(i.match(/(?<=\[).+?(?=\])/)[0]);
  const message = i.match(/(?<=\] ).+/)[0];
  return {
    time: time,
    message: message
  };
});

events.sort(function(a, b) {
  return new Date(a.time) - new Date(b.time);
});

let currentGuard = {};
let previousEvent = {};

startShift(events.shift());
events.forEach(event => {
  switch (event.message) {
    case "falls asleep":
      break;
    case "wakes up":
      setSleepTime(previousEvent.getMinutes(), event.time.getMinutes());
      break;
    default:
      endShift(currentGuard);
      startShift(event);
  }
  previousEvent = event.time;
});
endShift(currentGuard);

let sleepiestScore = 0;
let sleepiestGuard = {};

guards.forEach(g => {
  let sleepCount = Math.max(...g.sleepScore);
  if (sleepCount > sleepiestScore) {
    sleepiestScore = sleepCount;
    sleepiestGuard = g;
  }
});

let sleepiestMinute = sleepiestGuard.sleepScore.indexOf(sleepiestScore);

console.log(sleepiestGuard.id + " " + sleepiestMinute);
console.log(sleepiestGuard.id * sleepiestMinute);

// Helpers
function startShift(event) {
  let guardId = event.message.match(/(?<=#)\d+/)[0];
  let existingGuard = guards.find(g => g.id === guardId);
  if (existingGuard) {
    currentGuard = existingGuard;
  } else {
    currentGuard = createGuard(guardId);
  }
}

function createGuard(id) {
  return {
    id: id,
    sleepScore: Array(60).fill(0)
  };
}

function setSleepTime(a, b) {
  for (a; a < b; a++) {
    currentGuard.sleepScore[a]++;
  }
}

function endShift(guard) {
  let existingGuard = guards.find(g => g.id === guard.id);
  if (existingGuard) {
    var i = guards.indexOf(existingGuard);
    guards[i] = guard;
  } else {
    guards.push(guard);
  }
}
