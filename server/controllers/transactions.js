require('dotenv').config();
const express = require('express');
const db = require('../models');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const forEachCallBack = function(req, arr) {
  db.transaction.create({
    buyer: req.name,
    email: req.email,
    address: `${req.address1} ${req.address2} ${req.city}, ${req.state} ${req.zip}`,
    fulfilled: false
  }).then(function(trans) {
    arr.forEach(item => {
      trans.addItem(item);
    });
  });
};

router.get('/', function(req, res) {
  db.transaction.findAll({include: [db.item]}).then((results) => {
    res.send(results);
  });
});

router.post('/', function(req, res) {
  let counter = 0;
  let items = [];
  req.body.cart.forEach((id) => {
    db.item.findById(id.id).then((item) => {
      items.push(item);
      counter++;
      console.log(counter)
      if(counter === req.body.cart.length) {
        forEachCallBack(req.body.info, items);
        res.json({status: 200});
      }
    });
  });
});

router.put('/:id', function(req, res) {
  db.transaction.update({
    fulfilled: true
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.sendStatus(200)
  });
});

// POST /TRANSACTIONS/CHARGE create stripe charge
router.post('/charge', function(req, res) {
  const charge = stripe.charges.create({
    amount: 100,
    currency: 'usd',
    description: 'Lo Wolf Music Transaction',
    source: req.body.id
  }).then((result) => {
    res.json({status: 200});
  }).catch(err => {
    res.json({status: 400});
  });
});

module.exports = {router};