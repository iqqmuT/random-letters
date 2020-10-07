// This script creates random but unique series of letters.
// Can be used for creating random teams for example.

// Example:
// $ node index.js
// D C G F H A B E
// G A B C F E H D
// H G D A E C F B
// B D H E C F G A
// F E A H B D C G
// E B C G D H A F
// C F E B A G D H
// A H F D G B E C

const results = [];
const ALL_CHARS = 'ABCDEFGHJIKLMNOPQRSTUVWXYZ';
let NUM = process.argv[2];
if (NUM) {
	NUM = parseInt(NUM, 10);
} else {
	NUM = 8;
}
const CHARS = ALL_CHARS.substring(0, NUM);

function printRow(r) {
  const str = r.join(' ');
  console.log(str);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function someMatch(a, b) {
  for (let i = 0; i < NUM; i++) {
    if (a[i] === b[i]) {
      return true;
    }
  }
  return false;
}

function hasRow(row) {
  for (let i = 0; i < results.length; i++) {
    if (someMatch(results[i], row)) {
      return true;
    }
  }
  return false;
}

function genRow() {
  const row = [];
  for (let i = 0; i < NUM; i++) {
    let val;
    while (val === undefined || row.includes(val)) {
      val = CHARS[getRandomInt(NUM)];
    }
    row.push(val);
  }
  return row;
}

function addNewRow() {
  let row = genRow();
  while (hasRow(row)) {
    row = genRow();
  }
  results.push(row);
  printRow(row);
}

function run() {
  for (let i = 0; i < NUM; i++) {
    addNewRow();
  }
}

run();
