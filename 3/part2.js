const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split("\n");
// const input = ["#1 @ 0,0: 2x2", "#2 @ 2,2: 2x2", "#3 @ 1,1: 2x2"];

let grid = Array.from(Array(1000), () => new Array(1000));
let claims = [null];

input.forEach(row => {
  let claim = extractClaim(row);
  claims.push(claim.id);
  insertClaim(claim);
});
console.log(claims.find(c => c !== null));

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
  let existingId = grid[xAxis][yAxis];
  if (!existingId) {
    grid[xAxis][yAxis] = id;
  } else {
    claims[existingId] = null;
    claims[id] = null;
    grid[xAxis][yAxis] = "X";
  }
}
