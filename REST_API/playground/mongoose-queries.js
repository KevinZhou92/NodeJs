const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');


var id = '5a00997a569826b96d45c2f6';
var userId = '5a000b4b80a343432ae3bc0d';
if (!ObjectID.isValid(id)) {
  return console.log('Id not valid.');
}

// mongoose find
Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

// findOne
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

// findById
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found.');
  }
  console.log('Todo By Id', todo);
}).catch((e) => console.log(e));

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User not found.');
  }
  console.log('User: ', user);
}).catch((e) => console.log(e));
