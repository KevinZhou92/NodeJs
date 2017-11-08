// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//  object destructuring


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB Server.');
  }
  console.log('Connected to MongoDB Server.');

  // updateOne
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("59ff4b4c80a343432ae33755")
  }, {
    $set: {completed: true}
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });

  // findOneAndUpdate
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("59fec9d9a90e2ad80182c16b")
  }, {
    $set: {name: 'Jen'},
    $inc: {age : 1}
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });
});
