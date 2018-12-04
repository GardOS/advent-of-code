const fs = require("fs");

const boxes = fs.readFileSync("input.txt", "utf8").split("\n");

while (boxes.length > 0) {
  let box = boxes.pop();

  boxes.find(b => {
    let diff = 0;
    let shared;
    for (let i = 0; i < box.length; i++) {
      if (box.charAt(i) !== b.charAt(i)) {
        diff++;
        if (diff.length > 1) {
          break;
        }
        shared = box.slice(0, i) + box.slice(i + 1);
      }
    }
    if (diff === 1) {
      console.log(shared);
    }
  });
}
