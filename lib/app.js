const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
//const ensureAuth = require('./auth/ensure-auth');
//const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');
const { mungeTarot } = require('./munge');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/cards', async(req, res) => {
  try {
    const data = await request.get('https://rws-cards-api.herokuapp.com/api/v1/cards');
    const mungedInfo = mungeTarot(data.body);

    res.json(mungedInfo);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/cards/:type', async(req, res) => {
  try {
    const data = await request.get(`https://rws-cards-api.herokuapp.com/api/v1/cards/search?type=${req.params.type}`);
    const mungedInfo = mungeTarot(data.body);

    res.json(mungedInfo);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
