// var obj = {
//   name: 'Kevin'
// };
//
// var stringObj = JSON.stringify(obj);
// console.log(typeof obj);
// console.log(stringObj);
//

// var perString = '{"name": "Kevin", "age": 25}';
// var perObj = JSON.parse(perString);
//
// console.log(typeof perObj);
// console.log(perObj);

const fs = require('fs');

var originalNote = {
  title:'Some title',
  body :'Some body'
}

// originalNote

var originalNoteJson = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteJson);

var noteString = fs.readFileSync('notes.json');
var noteObj = JSON.parse(noteString);

console.log(typeof noteObj);
console.log(noteObj.title);
