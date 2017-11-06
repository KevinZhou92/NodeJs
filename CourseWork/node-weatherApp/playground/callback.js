var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Kevin'
  };

  setTimeout(() => {
    callback(user);
  }, 3000);

};

getUser(31, function (user) {
  console.log(user);
});
