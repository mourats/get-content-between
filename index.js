const fs = require('fs');
const AhoCorasick = require('ahocorasick');

const raw = fs.readFileSync('raw.txt');
let rawString = raw.toString();

let string = rawString
  .replace(/ +/g, '')
  .split('\t')
  .join('');

const rawdata = fs.readFileSync('./config.json');
const config = JSON.parse(rawdata);
let ac = new AhoCorasick([config.initial, config.final]);
let results = ac.search(string);

let result = '';
results.forEach((elem, idx) => {
  if (idx % 2 === 0) {
    const attribute = string.substring(
      elem[0] + 1,
      results[idx + 1][0] - results[idx + 1][1][0].length + 1
    );
    result += `'${attribute}', `;
  }
});

fs.writeFileSync('result.txt', result);
