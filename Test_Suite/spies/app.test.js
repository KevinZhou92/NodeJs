const expect = require('expect');
const rewire = require('rewire');

var app = rewire('./app');

describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  };
  app.__set__('db', db);
  it('should call the spy correctly', () => {
    var spy = expect.createSpy();
    spy('Kevin', 25);
    expect(spy).toHaveBeenCalledWith('Kevin', 25);
  });

  it('should call save user with user object', () => {
    var email = 'kevinzh92@udel.edu';
    var password = 'Kevin Zhou';
    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });
});
