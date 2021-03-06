require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');
const cors = require('cors');
const origin = process.env.CORS_ORIGIN;
const jwt = require('jsonwebtoken');
const auth = require('./controllers/auth');
const shows = require('./controllers/shows');
const transactions = require('./controllers/transactions');
const subscribers = require('./controllers/subscribers');

app.use(express.static(__dirname + 'static'));
app.use(bp.json());
app.use(cors({origin}));
app.use('/auth', auth.router);
app.use('/shows', shows.router);
app.use('/transactions', transactions.router);
app.use('/subscribers', subscribers.router);

app.post('/items/new', function(req, res) {
  console.log(req.body.imgUrl)
  db.item.create({
    name: req.body.name,
    price: req.body.price,
    imgUrl: req.body.imgUrl
  }).then((data) => {res.sendStatus(200)})
});

// POST /items - retrieve items in cart
app.post('/items', function(req, res) {
  let items = [];
  req.body.items.forEach((id) => {
    db.item.find({where: {id: id}}).then((result) => {
      items.push(result.dataValues);
    });
  });
  setTimeout(() => {
    res.json(items)
  }, 500)
});

app.get('/admin', auth.verifyToken, function(req, res) {
  console.log('HIT PROTECTED ADMIN GET ROUTE');
  jwt.verify(req.token, process.env.AUTH_SECRET, (err, authData) => {
    if(err) {
      res.status(403).json({verified: false});
    }
    else {
      res.json({authData, verified: true});
    }
  });
});

app.listen(port, () => {
    console.log(`Hooked on ${port}`);
});