require('dotenv').config();
const express = require('express');
const db = require('../models');
const router = express.Router();

// GET /subscribers - get all subscribers
router.get('/', function(req, res) {
  console.log('HIT SUBSCRIBERS GET ROUTE');
  db.subscriber.findAll().then(function(subscribers) {
    res.json(subscribers);
  });
});

// POST /subscribers/subscribe - create a new subscriber
router.post('/subscribe', function(req, res) {
  console.log("HIT POST SUBSCRIBE ROUTE");
  db.subscriber.create({
    name: req.body.name,
    email: req.body.email,
    new: true
  }).then(function(data) {
    res.send(data);
  });
});

router.put('/:id', function(req, res) {
  console.log('HIT SUBSCRIBERS PUT ROUTE');
  db.subscriber.update({
    new: false
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(sub) {
    res.sendStatus(200);
  });
});

module.exports = {router};