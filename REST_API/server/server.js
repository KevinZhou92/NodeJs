const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var port = process.env.PORT;
var app = express();
// middleware parse body from string to json object
app.use(bodyParser.json());
app.use('/', (req, res, next) => {
  if (req.method !== undefined) {
    var postLog = [
      new Date(),
      req.originalUrl,
      req.method,
      req.ip
    ].join(' ');

    fs.appendFile(__dirname + '/server.log', JSON.stringify(postLog) + '\n', (error) => {
      if (error) {
        console.log('Unable to record the log.');
      };
    });
  }
  next();
});

// POST Todos
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({
      status: 'OK',
      todos
    });
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/:id For example : /todos/1234
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({Error: 'Id not valid.'});
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send('Todo does not found.');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(500 ).send('Error!');
  });
});

// DELETE todo by id
app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(401).send({
      error: 'Id not valid.'
    });
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send({
        error: 'Id not found.'
      });
    }
    res.send({todo});
  }, (e) => {
    console.log(e);
  });
});

// PATCH(update todo items)  /todos/:id
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  // this line uses lodash to pichup the attributes which we allow the user to update
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: 'Id not valid.'
    });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
   Todo.findOneAndUpdate({
     _id: id,
     _creator: req.user._id
   }, {$set: body}, {new: true}).then((todo) => {
     if (!todo) {
       return res.status(404).send();
     }
     res.send({todo});
   }).catch((e) => {
     res.status(400).send('Error');
   });
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  // here the user in the first then is simply the user we created onnthe above
  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send({
      status: 'OK',
      user
    });
  })
  .catch((e) => res.status(400).send({
    Error: e,
  }));
});

// POST /users/login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send({Error: e});
  });

  // var email = req.body.email;
  // var password = req.body.password;
  //
  // User.findOne({email}).then((user) => {
  //   bcrypt.compare(password, user.password, function(err, result) {
  //       if (err) {
  //         return res.status(400).send({
  //           Error: 'Invalid credentials.'
  //         });
  //       }
  //       res.header('x-auth', user.tokens[0].token).send({message: 'Successfully logged in!'});
  //   });
  // });
});

app.delete('/users/me/token/', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send({message: 'Logged out!'});
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Start listening on ${port}`);
});

module.exports = {app};
