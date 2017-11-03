const yargs = require('yargs');
const notes = require('./notes');

const titleOption = {
                alias:'t',
                describe: 'title of the note',
                demand:true
              };
const bodyOption = {
                alias:'b',
                describe: 'body of the note',
                demand:true
              }



const input = yargs
                .command('add', 'Add note', {title: titleOption, body: bodyOption})
                .command('remove', 'Remove note', {title: titleOption})
                .command('read', 'Read a note', {title: titleOption})
                .help()
                .argv;

const command = input._[0];

if (command === 'add') {
    var note = notes.addNote(input.title, input.body);
    if (note !== undefined) {
        console.log('Note added');
        notes.logNote(note);
    } else {
        console.log('Note exist!');
    }
} else if (command === 'read') {
    var note = notes.readNote(command.title);
    if (note !== undefined) {
        console.log('Note loaded');
        notes.logNote(note);
    } else {
        console.log('Note note found!');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(command.title);
    var message = noteRemoved ? 'Note removed!' : 'Note not found!'
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing all ${allNotes.length} notes!`);
    allNotes.forEach((note) => notes.logNote(note));
}
