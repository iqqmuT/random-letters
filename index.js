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

const ALL_CHARS = 'ABCDEFGHJIKLMNOPQRSTUVWXYZ';
let NUM = process.argv[2];
if (NUM) {
	NUM = parseInt(NUM, 10);
} else {
	NUM = 8;
}
const CHARS = ALL_CHARS.substring(0, NUM);

function findLetterCount(str, ch) {
  let c = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ch) {
      c++;
    }
  }
  return c;
}

function findMax(str) {
  let max = 0;
  for (let i = 0; i < NUM; i++) {
    const c = findLetterCount(str, CHARS[i]);
    if (c > max) {
      max = c;
    }
  }
  return max;
}

function countPoints(results) {
  const points = {};
  for (let i = 0; i < NUM; i++) {
    const ch = CHARS[i];
    points[ch] = 0;
    let myTeams = '';
    for (let j = 0; j < results.length; j++) {
      const row = results[j];
      // console.debug(`row: ${row}`);
      const teams = [
        row.slice(0, 5).join(''),
        row.slice(5, 8).join(''),
      ];
      const team = teams
        .find(t => t.includes(ch))
        .replace(ch, ''); // strip own char off

      myTeams += team;
    }
    const maxLetter = findMax(myTeams);
    // console.log('myTeams', ch, myTeams, maxLetter);
    points[ch] = maxLetter;
  }
  // console.debug(points);
  return points;
}

function sumPoints(points) {
  let sum = 0;
  Object.values(points).forEach(c => { sum += c; });
  return sum;
}

function printRow(r) {
  const str = r.join(' ');
  console.log(str);
}

function printResults(results) {
  for (let i = 0; i < results.length; i++) {
    printRow(results[i]);
  }
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

function hasRow(results, row) {
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

function addNewRow(results) {
  let row = genRow();
  while (hasRow(results, row)) {
    row = genRow();
  }
  results.push(row);
  // printRow(row);
}

function run() {
  let c = 0;
  let bestResults;
  let min = 10000000;
  const started = Date.now();
  while (min > 32) {
    const results = [];
    for (let i = 0; i < NUM; i++) {
      addNewRow(results);
    }
    const points = countPoints(results);
    const sum = sumPoints(points);
    if (sum < min) {
      min = sum;
      bestResults = results;
    }
    c++;

    if (sum === 36) {
      console.log('medium results', results, sum, countPoints(results));
      printResults(results);
    }
  }
  const ended = Date.now();
  console.log(`iterated ${c} times`);
  console.log(`elapsed milsec: ${ended - started}`);
  console.log('best results', bestResults, min, countPoints(bestResults));
  printResults(bestResults);
}

run();
