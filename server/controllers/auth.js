require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../models');
const router = express.Router();
const passport = require('../config/passportConfig');

const passportAuth = passport.authenticate('local', {session: false});

const verifyToken = function(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1]
    req.token = token;
    next();
  }
  else {
    res.sendStatus(403);
  }
};

const createAdmin = function(name, hash) {
  return db.admin.create({name, password: hash}).then((admin) => admin);
}

const hashPassword = function(req, res, next) {
  const {name, password} = req.body;
  if(!name || !password) {
    res.status(422).send({error: 'Whoa Lo, you must provide an email and a password'});
  }

  bcrypt.hash(password, 12).then((hash) => {
    return createAdmin(name, hash).then((admin) => {
      res.locals.id = admin.dataValues.id;
      res.locals.admin = admin.dataValues.name;
      res.locals.hash = admin.dataValues.password;
      next()
    }).catch((err) => {
      res.json({error: 'ERROR CREATING ADMIN'})
    });
  }).catch((err) => {
    next(err);
  });
}

router.post('/login', passportAuth, function(req, res) {
  const user = req.body;
  jwt.sign({user}, process.env.AUTH_SECRET, {expiresIn: '1h'}, (error, token) => {
    if(error) {res.sendStatus(401);}
    res.json({token, user})
  });
});

// POST /admin - create new admin
router.post('/admin/new', hashPassword, function(req, res) {
  console.log("HIT CREATE ADMIN ROUTE")
  jwt.sign({user: res.locals}, process.env.AUTH_SECRET, {expiresIn: '1h'}, (err, token) => {
    res.json({token});
  });
});

module.exports = {router, verifyToken};