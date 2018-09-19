require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');
const cors = require('cors');
const origin = process.env.CORS_ORIGIN;
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
app.use(express.static(__dirname + '/static'));
app.use(bp.json());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https:///.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
    issuer: "https://{YOUR-AUTH0-DOMAIN}.auth0.com/",
    algorithms: ['RS256']
});

app.get('/api/battles/public', (req, res) => {
  let publicBattles = [
    // Array of public battles
  ];

  res.json(publicBattles);
})

app.get('/api/battles/private', authCheck, (req,res) => {
  let privateBattles = [
    // Array of private battles
  ];

  res.json(privateBattles);
})

// GET /shows - retrieve and send shows from database
app.get('/shows', cors({origin}), function(req, res) {
  console.log("HIT SHOWS GET ROUTE")
  db.show.findAll().then(function(shows) {
    shows.sort((a, b) => Date.parse(a.dataValues.date) - Date.parse(b.dataValues.date));
    upcoming = [];
    past = [];
    shows.forEach(function(show) {
      if(Date.parse(show.dataValues.date) > Date.now()) {
        if(upcoming.length < 4) {
          upcoming.push(show)
        } 
      }
      else {
        past.push(show);
      }
    });
    let allShows = {upcoming, past}
    res.send(allShows);
  });
});

app.post('/shows', function(req, res) {
  console.log('HIT SHOWS POST ROUTE')
  db.show.create({
    date: req.body.date,
    venue: req.body.venue,
    city: req.body.city,
    link: req.body.link
  }).then((data) => {
    res.sendStatus(200);
  })
})

app.listen(port, () => {
    console.log(`Hooked on ${port}`);
});