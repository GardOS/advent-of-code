const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const freqs = input.split("\n").map(Number);

const sums = [];
let searching = true;
let sum = 0;

while (searching) {
  for (let freq of freqs) {
    sum += freq;

    if (sums.includes(sum)) {
      searching = false;
      break;
    } else {
      sums.push(sum);
    }
  }
}

console.log(sum);
