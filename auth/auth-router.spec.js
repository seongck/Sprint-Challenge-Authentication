const router = require('./auth-router.js');
const server = require('./../api/server.js');
const db = require('./../database/dbConfig.js');
const request = require('supertest');

describe('POST /register', () => {
  it('should return the newly registered user', (done) => {
    request(server)
      .post('/api/auth/register')
      .send({ username: 'newuser', password: 'password' }) 
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });

  });

  it('should return a 500 error', (done) => {
    request(server)
      .post('/api/auth/register')
      .send({ username: 'justthis' }) 
      .set('Accept', 'application/json')
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  beforeEach(async () => {
    await db('users').truncate();
  });

});

describe('POST /login', () => {
  it('should return the newly registered user', (done) => {
    request(server)
      .post('/api/auth/register')
      .send({ username: 'seongck', password: 'password' }) 
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should return a 200 status', (done) => {
    request(server)
      .post('/api/auth/login')
      .send({ username: 'seongck', password: 'password' }) 
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return a 401 error', (done) => {
    request(server)
      .post('/api/auth/login')
      .send({ username: 'seongck', password: 'blahblah' }) 
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, res) => {
        if(err) return done(err);
        done();
      });
  });

});
