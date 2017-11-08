// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//  object destructuring

/*******
*
* Native mongodb driver interface
*/
// MongoClient connection
MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB Server.');
  }
  console.log('Connected to MongoDB Server.');

  // insertOne
  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  // insertOne
  db.collection('Users').insertOne({
    name: 'Kevin Zhou',
    age: 26,
    location: 'Zhenjiang'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert to users.', err.errmsg);
    }
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  });

  db.close();
});
