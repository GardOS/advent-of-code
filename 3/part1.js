const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n");
// const input = ["#1 @ 0,0: 2x2", "#2 @ 2,2: 2x2", "#3 @ 1,1: 2x2"];

var grid = Array.from(Array(1000), () => new Array(1000));
let overlap = 0;

input.forEach(row => {
  let claim = extractClaim(row);
  insertClaim(claim);
});
console.log(overlap);

// Helpers
function extractClaim(row) {
  const values = row.match(/\d+/g);
  return {
    id: values[0],
    xAxis: Number(values[1]),
    yAxis: Number(values[2]),
    xLength: Number(values[3]),
    yLength: Number(values[4])
  };
}

function insertClaim(claim) {
  for (let i = 0; i < claim.xLength; i++) {
    for (let j = 0; j < claim.yLength; j++) {
      setId(claim.id, claim.xAxis + i, claim.yAxis + j);
    }
  }
}

function setId(id, xAxis, yAxis) {
  let existingValue = grid[xAxis][yAxis];
  if (!existingValue) {
    grid[xAxis][yAxis] = id;
  } else {
    grid[xAxis][yAxis] = "X";
    if (existingValue !== "X") {
      overlap++;
    }
  }
}
