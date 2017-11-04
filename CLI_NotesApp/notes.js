
const fs = require('fs');


var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNote = notes.filter((note) => note.title === title);
  if (duplicateNote.length === 0) {
    notes.push(note)
    saveNote(notes);
    return note;
  }
};

var readNote = (title) => {
    var notes = fetchNotes();
    var filterNote = notes.filter(() => note.title === titlt);
    return filterNote;
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filterNotes = notes.filter((note) => note.title !== title);
  saveNote(filterNotes);
  return filterNotes.length !== notes.length;
};

var saveNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var getAll = () => {
  return fetchNotes();
};

var fetchNotes = () => {
  try {
    var notes = fs.readFileSync('notes-data.json');
    return JSON.parse(notes);
  } catch(e) {
    return [];
  }
};

var logNote = (note) => {
  console.log('------');
  console.log(`Note Title: ${note.title}`);
  console.log(`Note Body: ${note.body}`);
};

module.exports = {
  addNote,
  readNote,
  getAll,
  removeNote,
  logNote
}
