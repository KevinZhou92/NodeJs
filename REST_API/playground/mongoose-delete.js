const {mongoose} = require('./../server/db/mongoose');
const {Todo} =  require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');


// Todo.remove({}); Remove everything!
// Todo.remove({}).then((result) => {
//   console.log(result);
// }).catch((e) => {
//   console.log(e);
// });

// Todo.findOneAndRemove({_id: '5a009c4e80b6533022903e02'}).then((doc) => {
//   console.log(doc);
// })


Todo.findByIdAndRemove('5a00997a569826b96d45c2f6').then((todo) => {
  console.log(todo);
}).catch((e) => console.log(e));
