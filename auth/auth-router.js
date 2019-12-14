const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const db = require('./../database/dbConfig.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  findBy({ username })
    .first()
    .then( user => {
      if( user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' })
      }
    })
    .catch( error => {
      res.status(500).json(error);
    });
});

function find(){
  return db('users');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function genToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
  };

  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

module.exports = router;
