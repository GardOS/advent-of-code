const fs = require("fs");

const box = fs.readFileSync("input.txt", "utf8").split("\n");

let doubleLetterCount = 0;
let tripleLetterCount = 0;

box.forEach(box => {
  var charCount = {};
  for (var i = 0; i < box.length; i++) {
    var character = box.charAt(i);
    if (charCount[character]) {
      charCount[character]++;
    } else {
      charCount[character] = 1;
    }
  }

  if (Object.values(charCount).find(element => element === 2)) {
    doubleLetterCount++;
  }
  if (Object.values(charCount).find(element => element === 3)) {
    tripleLetterCount++;
  }
});

console.log(doubleLetterCount * tripleLetterCount);
