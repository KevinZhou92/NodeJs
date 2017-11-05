const request = require('supertest');
const app = require('./server.js').app;
const expect = require('expect');

describe('Server', () => {
  describe('#Root', () => {
    it('should return hello world response', (done) => {
      request(app)
      .get('/')
      .expect(404)
      .expect((res) => {
        expect(res.body).toInclude({
          error: 'Page not found.'
        });
      })
      .end(done);
    });
  });
  describe('#Users', () => {
    it('should return your object', (done) => {
      request(app)
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toInclude({
          name: 'Kevin Zhou',
          age: 25
        });
      })
      .end(done);
    });
  });
});
