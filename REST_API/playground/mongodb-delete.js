// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
//  object destructuring


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect MongoDB Server.');
  }
  console.log('Connected to MongoDB Server.');

  // deleteMany
  db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    console.log(result);
  });
  // deleteOne
  db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
    console.log(result);
  });

  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });

  // deleteMany
  db.collection('Users').deleteMany({name: 'Kevin Zhou'}).then((result) => {
    console.log(result);
  });

  // findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID("59fec829faf9bbd7ee175206")}).then((result) => {
    console.log(result);
  });

});
