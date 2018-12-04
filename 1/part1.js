const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const freqs = input.split("\n").map(Number);

const sum = freqs.reduce((a, b) => a + b);

console.log(sum);
