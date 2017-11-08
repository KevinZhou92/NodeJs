// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//  object destructuring


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB Server.');
  }
  console.log('Connected to MongoDB Server.');

  // find
  db.collection('Todos').find({
    _id: new ObjectID("59ff3b1080a343432ae334bd")}
  ).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch docs.');
  });

  // count find
  db.collection('Todos').find().count().then((count) => {
    console.log(`Todo count: ${count}`);
  }, (error) => {
    console.log('Unable to fetch todos.', err);
  });

  // find by property
  db.collection('Users').find({name: 'Kevin Zhou'}).toArray().then((results) => {
    console.log('Users');
    console.log(JSON.stringify(results, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users.', err);
  });
});
