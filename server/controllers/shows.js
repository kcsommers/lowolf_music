require('dotenv').config();
const express = require('express');
const db = require('../models');
const router = express.Router();
const cors = require('cors');
const origin = process.env.CORS_ORIGIN;

// GET /shows - retrieve and send shows from database
router.get('/', cors({origin}), function(req, res) {
  console.log("HIT SHOWS GET ROUTE")
  db.show.findAll().then(function(shows) {
    shows.sort((a, b) => Date.parse(a.dataValues.date) - Date.parse(b.dataValues.date));
    upcoming = [];
    past = [];
    shows.forEach(function(show) {
      if(Date.parse(show.dataValues.date) > Date.now()) {
        upcoming.push(show)
      }
      else {
        past.push(show);
      }
    });
    let allShows = {upcoming, past}
    res.send(allShows);
  });
});

// POST /shows - create a new show
router.post('/', function(req, res) {
  console.log('HIT SHOWS POST ROUTE')
  db.show.create({
    date: req.body.date,
    venue: req.body.venue,
    city: req.body.city,
    link: req.body.link,
    rsvp: 0
  }).then((data) => {
    res.status(200).send(data);
  })
});

router.put('/rsvp/:id', function(req, res) {
  db.show.findById(req.params.id).then((show) => {
    return show.increment('rsvp', {by: 1})
  }).then(function(show) {
    res.sendStatus(200);
  });
});

router.delete('/:id', function(req, res) {
  console.log('HIT SHOWS DELETE ROUTE')
  console.log(req.params)
  db.show.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    res.json(data);
  });
});

module.exports = {router};