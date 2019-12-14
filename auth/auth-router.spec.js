const router = require('./auth-router.js');
const db = require('./../database/dbConfig.js');
const request = require('supertest');

describe('POST /register', () => {
  it('should return the newly registered user', async (done) => {
    request(router)
      .post('/register')
      .send({ username: 'seongck', password: 'password' }) 
      .set('Accept', 'application/json')
      .expect(201, {
        username: 'seongck'
      }, done);
  });

  it('should return a 500 error', async (done) => {
    request(router)
      .post('/register')
      .send({ username: 'justthis' }) 
      .set('Accept', 'application/json')
      .expect(500, done);
  });
});

describe('POST /login', () => {
  it('should return a 200 status', async (done) => {
    request(router)
      .post('/login')
      .send({ username: 'seongck', password: 'password' }) 
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return a 401 error', async (done) => {
    request(router)
      .post('/login')
      .send({ username: 'seongck', password: 'blahblah' }) 
      .set('Accept', 'application/json')
      .expect(401, done);
  });

});




