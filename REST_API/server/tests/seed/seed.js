const {ObjectID} = require('mongodb');
const {Todo} = require('../../models/todo')
const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'kevinzh@udel.edu',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString(),
  }],
}, {
  _id: userTwoId,
  email: 'monsterzpc@udel.edu',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString(),
  }],
}];

const todos = [
  {
    _id: new ObjectID(),
    text: 'first to do',
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: 'second to do',
    completed: true,
    completedAt:333,
    _creator: userTwoId
  }
];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done()).catch((e) => console.log(e));
};
const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
}
module.exports = {todos, populateTodos, users, populateUsers};
